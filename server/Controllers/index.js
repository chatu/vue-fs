const fs = require("fs");
const { cwd } = require("process");
const path = require("path");
const rimraf = require("rimraf");
const { Router } = require("express");
const { exec } = require('child_process');

const DateTime = require("../Utilities/DateTime");
const Path = require("../Utilities/Path");
const Logger = require("../Utilities/Logger");

const router = Router();

const DEVICES_PATH = "./data/devices";
const FW_PATH = "./data/firmware";
const FLASH_SCRIPT_PATH = path.join(cwd(), "./data/scripts/flash.sh");
const FLASH_LOG_PATH = path.join(cwd(), "./data/scripts/flash.log");
const FLASH_LOG_END = "!CHATU!"

router.post("/devices", (req, res) => {
  const dirPath = DEVICES_PATH;
  let result = [];
  fs.readdir(dirPath, (err, filesPath) => {
    if (err) throw err;
    result = filesPath.map((filePath) => {
      return path.join(dirPath, filePath);
    });
    res.send(result);
  });
});

router.post("/firmwares", (_, res) => {
  const dirPath = FW_PATH;
  let result = [];
  let globalDir;

  if (!Path.isDir(dirPath)) globalDir = path.parse(dirPath).dir;
  else globalDir = dirPath;

  fs.readdir(globalDir, (err, filesPath) => {
    if (err) throw err;
    result = filesPath.map((filePath) => {
      return {
        paths: `${globalDir}/${filePath}`,
        names: filePath,
        the_time: DateTime.lastUpdatedDate(`${globalDir}/${filePath}`),
        is_dir: Path.isDir(`${globalDir}/${filePath}`),
        fileExt: path.extname(`${globalDir}/${filePath}`),
      };
    });
    res.send(
      result.sort((a, b) => {
        return new Date(b.the_time) - new Date(a.the_time);
      })
    );
  });
});

router.post("/delete", (req, res) => {
  const thePath = req.body.sent_path;

  thePath.forEach((filepath) => {
    rimraf(path.join(FW_PATH, filepath), (err) => {
      if (err) return Logger.Error(err);

      Logger.Event("Delete successful");
    });
  });
  res.sendStatus(200);
});

router.get("/download", (req, res) => {
  const myPath = path.join(cwd(), FW_PATH, req.query.file);
  Logger.Event(`Downloading: ${myPath}`);
  res.sendFile(myPath);
});

router.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  const myFile = req.files.file;

  myFile.mv(path.join(FW_PATH, myFile.name), (err) => {
    if (err) {
      Logger.Error(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
});

router.post("/flash", (req, res) => {
  const devices = req.body.devices;
  const firmware = path.join(FW_PATH, req.body.firmware);

  exec(`${FLASH_SCRIPT_PATH} "${firmware}" ${devices.join(" ")} > ${FLASH_LOG_PATH}`, (err, stdout, stderr) => {
    if (err) {
      Logger.Error(err);
      return;
    }

    Logger.Event(`${devices} ...were flashed with... ${firmware}`);
    Logger.System(`stdout: ${stdout}`);
    Logger.System(`stderr: ${stderr}`);
  });

  res.sendStatus(200);
});

router.post("/lines", (req, res) => {
  const afterLineNumber = req.body.afterLineNumber;

  fs.readFile(FLASH_LOG_PATH, (err, data) => {
    if (err) {
      Logger.Error(err);
      return res.status(500).send({ msg: "Error occured" });
    }

    let lines = data.toString().split("\n");
    const last = lines.length-1;
    const eof = lines[last] == FLASH_LOG_END;
    if (afterLineNumber != 0) {
      lines = lines.slice(afterLineNumber);
    }
    if (eof) {
      lines.pop();
    }

    res.send({
      lines: lines.join("\n"),
      lastRetrievedLineNumber: last,
      eof,
    });
  });
});

module.exports = router;

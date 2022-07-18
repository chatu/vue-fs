<template>
  <div class="d-flex" id="wrapper">
    <div id="page-content-wrapper">

      <div id="divFileManager" class="container-fluid">
        <div class="row">
          <div class="col-md-12">

            <v-btn
              id="btnDelete"
              v-b-modal.deleteModal
              class="float-right"
              style="color: white; margin-left: 5px; margin-top: 10px;"
              color="#dc3545"
              :disabled="!(selectedFirmware.length > 0 && selectedFirmware.length <= 5 && selectedDevices.length == 0)"
              small
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 10px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
              Delete
            </v-btn>

            <v-btn
              id="btnDownload"
              small
              color="#8fe8c2"
              :disabled="!(selectedFirmware.length == 1 && selectedDevices.length == 0)"
              @click="downloadFirmware()"
              class="float-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 10px; margin-top: 0px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cloud-download"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
                <path
                  d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                />
              </svg>
              Download
            </v-btn>

            <v-btn
              class="float-right"
              id="downloadMulti"
              small
              color="#3a5582"
              style="color: white; margin-top: 10px; margin-right: 10px;"
              :disabled="!(selectedFirmware.length == 0 && selectedDevices.length == 1 && (selectedDevices[0].startsWith('6ee805da') || selectedDevices[0].startsWith('def7fc4d')))"
              @click="powerCycle()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 7px; margin-left: -3px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"
                />
                <path
                  d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                /></svg>
              Power Cycle
            </v-btn>

            <v-btn
              id="btnMove"
              class="float-right"
              v-b-modal.moveModal
              :disabled="selectedFirmware.length != 1 || selectedDevices.length == 0"
              style="margin-right: 10px; margin-top: 10px;"
              color="#ffb10a"
              small
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 10px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-folder-symlink"
                viewBox="0 0 16 16"
              >
                <path
                  d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"
                />
                <path
                  d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"
                />
              </svg>
              Flash
            </v-btn>

          </div>
        </div>

        <vue-dropzone
          ref="myVueDropzone"
          id="myDropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>

        <div class="row">

          <div class="col-md-6">
            <div style="margin: 15px 0px -5px 10px;">
              <i>Devices:</i>
            </div>
            <table
              id="fileTable"
              class="display col-md-12"
              style="overflow-y: scroll; border: 2px solid #e5e5e5; margin-top: 10px;"
            >
              <tbody>
                <tr
                  v-for="device in devices"
                  :key="device"
                >
                  <div id="explorerSpan2">
                    <label style="width: 100%; cursor: pointer;">
                      <input
                        id="myCheckbox"
                        type="checkbox"
                        style=" margin-left: 10px; padding: 10px;"
                        @click="toggleDevice(device)"
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin-right: 10px; margin-left: 10px; color: #007bff; margin-top: -5px;"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                        />
                      </svg>

                      <span id="fileName">{{ device }}</span>
                    </label>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-6">
            <div style="margin: 15px 0 -5px 10px;">
              <i>Firmware:</i>
            </div>
            <table
              id="fileTable"
              class="display col-md-12"
              style="overflow-y: scroll; border: 2px solid #e5e5e5; margin-top: 10px;"
            >
              <tbody>
                <tr
                  v-for="firmware in firmwares"
                  :key="firmware.name"
                >
                  <div id="explorerSpan2">
                    <label style="width: 100%; cursor: pointer;">
                      <input
                        id="myCheckbox"
                        type="checkbox"
                        style=" margin-left: 10px; padding: 10px;"
                        :checked="selectedFirmware.length && selectedFirmware[0] == firmware.names"
                        @click="toggleFirmware(firmware.names)"
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin-right: 10px; margin-left: 10px; color: #007bff; margin-top: -5px;"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                        />
                      </svg>

                      <span id="fileName">{{ firmware.names }}</span>
                    </label>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div style="margin: -10px 0px -5px 10px;">
              <i>Output:</i>
            </div>
            <table
              class="display col-md-12"
              style="overflow-y: scroll; border: 2px solid #e5e5e5; margin-top: 10px;"
            >
              <tbody style="padding: 10px;"
                ref="outputLinesWindow"
              >
                <tr>
                  <pre><code class="font-mono leading-normal" v-html="outputLines"></code></pre>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Flash devices modal -->
        <b-modal
          ref="moveModal"
          id="moveModal"
          hide-footer
          scrollable
          title="Flash Confirmation"
        >
          <div class="d-block">
            <div>
              <span>
                <b>Target Firmware:</b>
              </span>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="targetFirmware">
                  {{ selectedFirmware[0] }}
                </div>
              </div>
            </div>
          </div>

          <div class="d-block">
            <div>
              <span>
                <b>Target Devices:</b>
              </span>
            </div>
            <div class="row">
              <div class="col-md-12">
                <table
                  id="tableMove"
                  style="border: 2px solid #e5e5e5; margin-top: 10px; max-height: 400px; overflow-y: scroll;"
                >
                  <tbody style="height: 25vh;">
                    <tr
                      v-for="device in selectedDevices"
                      :key="device"
                      id="trDirectories"
                    >
                      <div class="targetDevices">
                        {{ device }}
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="float-right">
            <v-btn style="margin-top: 10px;" @click="hideFlashModal()"
              >Cancel</v-btn
            >
            <v-btn
              id="btnMoveClick"
              style="color: white; margin-top: 10px; margin-left: 10px;"
              color="#007bff"
              :disabled="selectedFirmware.length != 1 || selectedDevices.length == 0"
              @click="flashDevices()"
              >Flash Devices</v-btn
            >
          </div>
        </b-modal>

        <!-- Delete firmware modal -->
        <b-modal
          ref="deleteModal"
          id="deleteModal"
          hide-footer
          scrollable
          title="Delete"
        >
          <div class="d-block text-center">
            <svg
              style="text-align: center; color: #dc3545;"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
              />
              <path
                d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
              />
            </svg>
            <p style="text-align: center; margin-top: 10px;">
              Are you sure you want to delete the following?
            </p>
            <div class="mx-auto col-md-12"
              style="padding: 0;"
              v-for="selected in selectedFirmware"
              :key="selected"
            >
              <span>
                <b>{{ selected }}</b>
              </span>
            </div>
            <div class="float-right">
              <v-btn small style="margin-top: 20px;" @click="hideDeleteModal()">Cancel</v-btn>
              <v-btn
                small
                style="margin-top: 20px; background-color: #dc3545; color: white; margin-left: 10px;"
                @click="deleteFirmware()">Delete</v-btn
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vue2Dropzone from "vue2-dropzone";
import FileDownload from "js-file-download";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import $ from "jquery";

const serverUrl = "http://10.55.67.139:5000";

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${serverUrl}/upload`,
        thumbnailWidth: 150,
        maxFilesize: 10000,
        dictDefaultMessage: "Drag & Drop or Click to Upload Firmware",
        addRemoveLinks: true,
        dictRemoveFile: "Clear File",
        timeout: 10000000,
        init: function () {
          this.on("complete", function(file) {
            this.removeFile(file);
            this.element.__vue__.$parent.getFirmwares();
          });
        }
      },
      devices: [],
      firmwares: [],
      selectedDevices: [],
      selectedFirmware: [],
      lastRetrievedLineNumber: 0,
      outputLines: "",
      poller: null
    };
  },

  mounted() {
    this.getDevices();
    this.getFirmwares();
  },

  methods: {
    getDevices() {
      axios
        .post(`${serverUrl}/devices`)
        .then((response) => {
          var devices = response.data;
          var device;
          for (var i = 0; i < devices.length; i++) {
            var parts = devices[i].split('/');
            devices[i] = parts[parts.length-1];
          }
          this.devices = devices;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getFirmwares() {
      axios
        .post(`${serverUrl}/firmwares`)
        .then((res) => {
          this.firmwares = res.data;
          this.clearSelections();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clearSelections() {
      this.selectedFirmware = [];
      this.selectedDevices = [];
      $("#fileTable input:checkbox").prop("checked", false);
    },

    toggleDevice(device) {
      var $this = this;
      var selected = $this.selectedDevices;

      if (selected.includes(device)) {
        selected.splice(selected.indexOf(device), 1);
      } else {
        selected.push(device);
      }
    },

    toggleFirmware(firmware) {
      var $this = this;
      var selected = $this.selectedFirmware;

      if (selected.includes(firmware)) {
        selected.splice(selected.indexOf(firmware), 1);
      } else {
        selected.push(firmware);
      }
    },

    hideDeleteModal() {
      this.$refs["deleteModal"].hide();
    },

    deleteFirmware() {
      this.$refs["deleteModal"].hide();
      axios
        .post(`${serverUrl}/delete`, {
          sent_path: this.selectedFirmware,
        })
        .then((res) => {
          this.getDevices();
          this.getFirmwares();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    downloadFirmware() {
      var selectedFirmware = this.selectedFirmware[0];
      axios
        .get(`${serverUrl}/download?file=${selectedFirmware}`, {
          responseType: "blob",
        })
        .then((response) => {
          FileDownload(response.data, selectedFirmware);
          this.clearSelections();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    hideFlashModal() {
      this.$refs["moveModal"].hide();
    },

    flashDevices() {
      this.outputLines = "";
      this.lastRetrievedLineNumber = 0;

      axios
        .post(`${serverUrl}/flash`, {
          devices: this.selectedDevices,
          firmware: this.selectedFirmware[0]
        })
        .then((res) => {
          this.clearSelections();
          this.hideFlashModal();
          this.poller = window.setInterval(() => this.fetchNewOutputLines(), 2500);
        })
        .catch((err) => {
          window.alert("Problem detected:" + err);
        });
    },

    fetchNewOutputLines() {
      axios
        .post(`${serverUrl}/lines`, {
          afterLineNumber: this.lastRetrievedLineNumber,
        })
        .then((res) => {
          this.outputLines += res.data.lines;
          this.lastRetrievedLineNumber = res.data.lastRetrievedLineNumber;
          if (res.data.eof) {
            window.clearInterval(this.poller);
          }
          this.scrollToBottom();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    scrollToBottom() {
      this.$refs.outputLinesWindow.scrollTop = this.$refs.outputLinesWindow.scrollHeight;
    },

    powerCycle() {
      axios
        .post(`${serverUrl}/powercycle`, {
          devices: this.selectedDevices,
        })
        .then((res) => {
          this.clearSelections();
        })
        .catch((err) => {
          window.alert("Problem detected:" + err);
        });
    }
  }
};
</script>

<style>
#wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
  border: none;
}

#page-content-wrapper {
  min-width: 100vw;
}

#myDropzone {
  margin-top: 15px;
}

#btnNewFolder {
  margin-top: 10px;
}

#btnViewFile {
  margin-top: 10px;
}

#btnDownload {
  margin-top: 10px;
  margin-right: 5px;
}

#explorerSpan {
  width: 95%;
  cursor: pointer;
  margin-left: 10px;
  height: 40px !important;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.targetDevices {
  width: 95%;
  margin-left: 10px;
  height: 40px !important;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.targetFirmware {
  line-height: 40px;
  text-overflow: ellipsis;
  padding: 0 0 5px 10px;
}

#explorerSpan2 {
  width: 100% !important;
  cursor: pointer;
  margin-left: 10px;
  max-height: 40px;
  line-height: 40px;
  margin-left: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#explorerSpan2:hover {
  background-color: #f9fbfc;
  width: 100%;
}

#btnBack {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 10px;
  border: 2px solid #e5e5e5;
  background-color: white;
  outline: none;
}

#btnBack:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

#btnClearSelect {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 34px;
  border: 2px solid #e5e5e5;
  outline: none;
}

#btnClearSelect:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

#trDirectories:hover {
  background-color: #f9fbfc;
  width: 100%;
}

#btnSettings:hover {
  background-color: #dddddd !important;
}

#btnManager:hover {
  background-color: #dddddd !important;
}

#btnStats:hover {
  background-color: #dddddd !important;
}

.dropzone {
  min-height: 90px !important;
  line-height: 0px;
}

.searchBar {
  width: 100%;
  height: 28px;
  margin-top: 10px;
  margin-bottom: 0px;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  color: black;
  padding-left: 25px;
  outline: none;
}

.searchBar::placeholder {
  color: rgb(73, 73, 73) !important;
  padding-left: 5px;
  font-family: "consolas";
}

#pathReadout {
  margin-left: 0px;
  margin-top: 2px;
  height: 20px;
  min-width: 400px;
  max-width: 900px;
  color: rgb(255, 255, 255);
  font-family: "consolas";
  font-size: 12px;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#selectedReadout {
  margin-left: 0px;
  margin-top: 32px;
  height: 20px;
  min-width: 400px;
  max-width: 900px;
  color: rgb(255, 255, 255);
  font-family: "consolas";
  font-size: 12px;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

table {
  width: 100%;
  border-spacing: 0;
}

thead,
tbody,
tr,
th,
td {
  display: block;
}

thead tr {
  /* fallback */
  width: 97%;
  /* minus scroll bar width */
  width: -webkit-calc(100% - 16px);
  width: -moz-calc(100% - 16px);
  width: calc(100% - 16px);
}

tr:after {
  /* clearing float */
  content: " ";
  display: block;
  visibility: hidden;
  clear: both;
}

tbody {
  height: 35vh;
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

tbody td,
thead th {
  width: 19%; /* 19% is less than (100% / 5 cols) = 20% */
  float: left;
}

.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}

.label-text {
  margin-left: 16px;
}

#chipMovePicked {
  margin-top: 7px;
}

#chipMoveDest {
  font-family: "consolas";
  margin-top: 10px;
}

#destInner {
  font-weight: 600;
  padding-right: 7px;
}

#entries {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

pre {
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>

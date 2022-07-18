#!/bin/bash

FW_FILE=$1
FW_FILE_FULL_PATH=$PWD/$FW_FILE
DEVICES_FULL_PATH=$PWD/data/devices
IPE_PATH=/Applications/microchip/mplabx/v5.45/mplab_platform/mplab_ipe/bin
IPE_FULL_PATH=$IPE_PATH/ipecmd.sh

if [[ -z $IPE_FULL_PATH ]]; then
    echo "Error: unable to find IPE cmd in $IPE_PATH"
    exit 1
fi

if [[ -z $FW_FILE ]]; then
    echo "Error: invalid fw file provided"
    exit 1
fi

if [[ ! -f $FW_FILE_FULL_PATH ]]; then
    echo "Error: unable to find fw file $FW_FILE_FULL_PATH"
    exit 1
fi

if [[ -z $2 ]]; then
    echo "Error: invalid device provided"
    exit 1
fi

function flash_device() {
    local acuId=$1
    local toolSn=$(sed '5q;d' $DEVICES_FULL_PATH/$acuId)

    $IPE_FULL_PATH \
        -P32MZ2048EFM100 \
        -TSBUR$toolSn \
        -OL -M \
        -F$FW_FILE_FULL_PATH
}

shift
for arg in "$@"
do
    echo "=====> Flashing $arg started =====>"
    echo $(date +"%Y-%m-%dT%H:%M:%S%z")
    flash_device "$arg"
    echo $(date +"%Y-%m-%dT%H:%M:%S%z")
    echo "<===== Flashing $arg completed <====="
    
done

echo -n "!DoNe!"

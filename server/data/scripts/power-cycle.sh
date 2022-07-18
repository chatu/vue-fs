#!/bin/bash

#  A0 01 00 A1  # 1 off
#  A0 01 01 A2  # 1 on
#  A0 02 00 A2  # 2 off
#  A0 02 01 A3  # 2 on

DEVICE_INPUT=$1
SERIAL_PORT=/dev/cu.usbserial-144140

if [[ -z $DEVICE_INPUT ]]; then
    echo "Error: invalid device provided"
    exit 1
fi

function power_cycle() {
    local acuId=$1

    if [[ $acuId == "6ee805daaefdccdc34630f2744d47b05eca7adc9" ]]; then
        echo -en "\xa0\x01\x01\xa2" >$SERIAL_PORT
        sleep 1
        echo -en "\xa0\x01\x00\xa1" >$SERIAL_PORT
    elif [[ $acuId == "def7fc4dee46fcac971b284a00dc0bbecc882b18" ]]; then
        echo -en "\xa0\x02\x01\xa3" >$SERIAL_PORT
        sleep 1
        echo -en "\xa0\x02\x00\xa2" >$SERIAL_PORT
    else
        echo "nothing to do $acuId"
    fi
}

power_cycle $DEVICE_INPUT

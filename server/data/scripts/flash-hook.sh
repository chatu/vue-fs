#!/bin/bash

HOOKS_URL=10.55.67.141:9000
args="$@"

curl \
    -H "Content-Type:application/x-www-form-urlencoded" \
    -XPOST -d "args=$args" \
    http://$HOOKS_URL/hooks/flash-devices

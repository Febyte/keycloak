#!/bin/bash

/usr/sbin/sshd

su keycloak /opt/keycloak/bin/kc.sh "$@"

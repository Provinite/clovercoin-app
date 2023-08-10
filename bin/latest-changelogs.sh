#!/bin/bash
yarn workspaces foreach --exclude clovercoin-app exec ../../bin/changelog.sh

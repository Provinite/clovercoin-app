#!/bin/bash
# pushd ./packages/api
# ../../bin/changelog.sh
# popd
# pushd ./packages/client
# ../../bin/changelog.sh
# popd

yarn workspaces foreach --exclude clovercoin-app exec ../../bin/changelog.sh | sed "s/^.*YN0000:\s*//g"

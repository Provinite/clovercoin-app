#!/bin/bash
export YARN_ENABLE_COLORS=false
./bin/latest-changelogs.sh | jq -Rs "{content: .}" | curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

#!/bin/bash
FORCE_COLOR=0 ./bin/latest-changelogs.sh | jq -Rs "{content: .}" | curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

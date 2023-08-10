#!/bin/bash
FORCE_COLOR=0 ./bin/latest-changelogs.sh | jq -Rsa "{content: .}" | curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

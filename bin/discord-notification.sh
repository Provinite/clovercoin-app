#!/bin/bash
./bin/latest-changelogs.sh | jq -Rsa "{content: .}" | curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

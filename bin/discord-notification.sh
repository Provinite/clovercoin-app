#!/bin/bash
NX_BASE=3b1947de70fee1de2e300150e4171968aa91c29c
export YARN_ENABLE_COLORS=false
git diff "$NX_BASE..HEAD" --name-only |
  grep CHANGELOG.md |
  xargs dirname |
  sed 's/$/\/package.json/' |
  xargs jq '.name ' |
  xargs -I {} yarn workspace {} exec $(pwd)/bin/changelog.sh

# ./bin/latest-changelogs.sh | jq -Rs "{content: .}" #| curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

#!/bin/bash
export YARN_ENABLE_COLORS=false
git diff "$NX_BASE..HEAD" --name-only |
  grep CHANGELOG.md |
  xargs dirname |
  sed 's/$/\/package.json/' |
  xargs jq '.name ' |
  xargs -I {} yarn workspace {} exec $(pwd)/bin/changelog.sh

# ./bin/latest-changelogs.sh | jq -Rs "{content: .}" #| curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"

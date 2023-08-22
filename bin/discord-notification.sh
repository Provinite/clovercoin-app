#!/bin/bash
export YARN_ENABLE_COLORS=false

contents=$(git diff $NX_BASE..HEAD \
 --unified=0 \
 --color=never "**/CHANGELOG.md" |
 sed -e 's/^\(\s\|\)[+-]//g' |
 sed -e '/^\(@@\|[+][+]\|index \|diff --git\).*$/d' |
 sed -e 's/^--[^/]\+[/]\(.*\)CHANGELOG.md/jq -r .name "\1package.json" | sed "s\/^\/# \/g"/eg'
)
if [ -n "$contents" ]; then
  printf $'%s\n' \
      "# New Release in $CC_ENV_NAME" \
      "A new version of the clovercoin app has been pushed to the **$CC_ENV_NAME** site." \
      "Here is a summary of the latest changes!"$'\n'
      "$contents" |
    jq -Rs "{content: .}"  | 
    curl -H "Content-Type: application/json" -d @- "$WEBHOOK_URL"
fi

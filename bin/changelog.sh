#!/bin/bash
if [ -f CHANGELOG.md ]; then
  echo $npm_package_name
  sed -n -e '/#/,/#/ p' CHANGELOG.md | head -n -2
fi;

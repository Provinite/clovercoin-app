#!/bin/bash
if [ -f CHANGELOG.md ]; then
  echo "# $npm_package_name"
  grep "# [0-9]" -m 1 CHANGELOG.md | head -1
  awk '/^# [0-9]/ { if (p) { exit }; if ($3 == ver) { p=1; next } } p && NF' CHANGELOG.md
  echo ""
fi;

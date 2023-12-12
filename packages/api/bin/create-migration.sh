#!/bin/bash
set -e
migration=$( \
  yarn typeorm migration:create \
    src/migrations/$@ \
  | awk -F" " '{print $2}' \
)
yarn migration:register $migration
yarn prettier src/migrations/ --write
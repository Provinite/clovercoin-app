#!/bin/bash
set -e
migration=$( \
  yarn typeorm migration:generate \
    src/migrations/$@ \
    -d src/db/migrationDataSource.ts \
  | awk -F" " '{print $2}' \
)
yarn migration:register $migration
yarn prettier src/migrations/ --write

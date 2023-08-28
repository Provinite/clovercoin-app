#!/bin/bash
set -e
migration=$( \
  yarn typeorm migration:generate \
    src/migrations/$@ \
    -d src/db/migrationDataSource.ts
)
echo $migration
migration=$(echo $migration | awk -F" " '{print $2}')
echo $migration
yarn migration:register $migration
yarn prettier src/migrations/ --write

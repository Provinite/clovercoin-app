#!/bin/bash
migration=$( \
  yarn typeorm migration:create src/migrations/$@ \
  | awk -F" " '{print $2}' \
)
yarn migration:register $migration
yarn lint --fix 2&>1
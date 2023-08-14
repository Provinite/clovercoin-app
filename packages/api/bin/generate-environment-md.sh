#!/bin/bash
yarn ts-node ./bin/generate-environment-md.mts > ENVIRONMENT.md
yarn prettier --write ENVIRONMENT.md
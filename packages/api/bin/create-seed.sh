#!/bin/bash
yarn ts-node ./bin/create-seed.mts $@
yarn prettier ./src/seeds/* --write
#!/usr/bin/bash
yarn clean
yarn build
docker build . -t test
docker run --rm \
  -e CC_DB_HOST=host.docker.internal \
  -p 9000:8080 \
  -p 9229:9229 \
  -it test
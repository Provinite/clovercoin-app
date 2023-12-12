#!/usr/bin/bash
# Usage: cat test.json | query-container.sh
curl \
 -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
 -d @-
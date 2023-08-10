#!/bin/bash
echo "# New Release!"
echo "A new version of the clovercoin app has been pushed to the beta site."
echo "Here is a summary of the latest changes!"
echo ""
yarn workspaces foreach --exclude clovercoin-app exec ../../bin/changelog.sh | sed "s/^.*YN0000:\s*//g"

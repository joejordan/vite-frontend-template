#!/usr/bin/env bash

# https://gist.github.com/vncsna/64825d5609c146e80de8b1fd623011ca
set -euo pipefail

# Define the input vars
GITHUB_REPOSITORY=${1?Error: Please pass username/repo, e.g. joejordan/vite-frontend-template}
GITHUB_REPOSITORY_OWNER=${2?Error: Please pass username, e.g. joejordan}
GITHUB_REPOSITORY_DESCRIPTION=${3:-""} # If null then replace with empty string

echo "GITHUB_REPOSITORY: $GITHUB_REPOSITORY"
echo "GITHUB_REPOSITORY_OWNER: $GITHUB_REPOSITORY_OWNER"
echo "GITHUB_REPOSITORY_DESCRIPTION: $GITHUB_REPOSITORY_DESCRIPTION"

# jq is like sed for JSON data
jq --arg NAME "@$GITHUB_REPOSITORY" \
   --arg AUTHOR "$GITHUB_REPOSITORY_OWNER" \
   --arg URL "https://github.com/$GITHUB_REPOSITORY" \
   --arg DESCRIPTION "$GITHUB_REPOSITORY_DESCRIPTION" \
   '.name = $NAME |
    .description = $DESCRIPTION |
    .author.name = $AUTHOR |
    .author.url = $URL |
    .repository.url = "git://" + $URL + ".git"' \
   package.json > package.json.tmp && mv package.json.tmp package.json

echo "package.json has been updated successfully."

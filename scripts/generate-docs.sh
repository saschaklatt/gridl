#!/usr/bin/env bash

PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo "generate docs for gridl ${PACKAGE_VERSION}"

rm -rf "./docs/gridl/${PACKAGE_VERSION}"
jsdoc src -r --package package.json -d ./docs -u ./docs/tutorials --readme ./docs/README.md

cd docs
[ -e index.html ] && rm index.html
ln -s "gridl/${PACKAGE_VERSION}/index.html" "index.html"

echo "docs generated successfully"

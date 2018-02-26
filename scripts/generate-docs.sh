#!/usr/bin/env bash

INDEX_FILE="README.md"
LATEST_DIR="latest"
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

echo "generate docs for gridl ${PACKAGE_VERSION}"

rm -rf "./docs/gridl/${PACKAGE_VERSION}"
jsdoc src -r --package package.json -d ./docs -u ./docs/tutorials

cd docs/gridl

[ -e ${LATEST_DIR} ] && rm -rf ${LATEST_DIR}
ln -s "./${PACKAGE_VERSION}" ${LATEST_DIR}

echo "docs generated successfully"

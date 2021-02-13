#!/usr/bin/env bash

PKG_VERSION=$(node -p -e "require('./package.json').version")
DOCS_PATH="./docs/gridl"
DOCS_PATH_VERSION="${DOCS_PATH}/${PKG_VERSION}"
LATEST_FOLDER="latest"

echo "generating docs v${PKG_VERSION}"

rm -rf $DOCS_PATH_VERSION
typedoc --out $DOCS_PATH_VERSION

cd $DOCS_PATH

[ -e $LATEST_FOLDER ] && rm -rf $LATEST_FOLDER
ln -s "./${PKG_VERSION}" $LATEST_FOLDER

echo "docs generated successfully"

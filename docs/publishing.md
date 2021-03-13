# Publishing to npm

Steps

- bump version in `package.json`
- `yarn test`
- `yarn build`
- `cd dist`
- `npm publish --tag latest` or if next branch `npm publish --tag next`

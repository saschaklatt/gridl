## TODOs for v0.11.0

1. Feature complete
    - [x] ~~implement grid data type~~
    - [x] ~~Add missing tests~~
    - [x] ~~Clean up neighbour cell calculations~~
    - [x] ~~Some functions take the grid as one of their parameters, others create a new function that takes the grid -> unify~~
    - [x] ~~Make sure src/index.ts file includes all functions, so that all functions are available in the bundle~~
    - [x] ~~Resolve circular dependencies~~
    - [x] ~~Import all functions from top-level index.ts file `src/index.ts` to make sure file is bundled~~
    - [x] ~~Consider providing Position, Shape and Area as separate immutable data structures?~~
    - [x] ~~Clean up types (remove unused types and consider removing redundant types like GridPosition, GridShape, etc)~~
    - [x] ~~Rename `gridTransformers` to `transformers`~~
    - [x] ~~Clean up tests / test new data structures~~
    - [x] ~~move `getNeighbours()` to core module~~
    - [x] ~~implement `moveGrid(pos)` to change the {x, y} coordinates of a grid~~
    - [x] ~~use options object instead of overloading methods for `createGrid()` and `createGridFromArray2D()`~~
    - [x] ~~rename `data` to `array2D`~~
1. Tooling
    - [x] ~~replace tsdx with custom setup: rollup/webpack, jest, tsc, eslint~~
    - [x] ~~transpile files to single js files and as monolithic-bundle~~
    - [x] ~~try to use 2 different directories, one for transpiled js files and one for bundles (e.g. `dist/` and `bundles/`)~~
    - [x] ~~properly create dist folder: [How to npm publish specific folder but as package root](https://stackoverflow.com/questions/38935176/how-to-npm-publish-specific-folder-but-as-package-root)~~
    - [x] ~~build esm and umd~~
    - [x] ~~properly lint src, tests and doc-comments~~
    - [x] ~~fix all warnings~~
    - [x] ~~measure test coverage~~
    - [x] ~~achieve 100% test coverage~~
    - [x] ~~check package.json: remove unnecessary scripts and dependencies, check other fields~~
1. Complete docs
    - [x] ~~document everything that's being exported~~
    - [x] ~~support `@template` description for all functions~~
    - [x] ~~provide `@example` for exported functions~~
    - [x] ~~update tutorials for selectors~~
    - [x] ~~if function returns another function that takes the grid, instead of directly returning the result - the docs are not very clear about how that works~~
    - [x] ~~inform about grid origin in README (top-left to bottom-right corner)~~
    - [x] ~~inform to not mutate the grid by hand, instead use a transformer or write your own transformer~~
    - [x] ~~explain types and terminology in README (grid, subgrid, area, shape, position, coordinates...)~~
    - [x] ~~README~~
        - [x] ~~installation~~
        - [x] ~~basic usage~~
    - [ ] add `@since` tag to all functions
    - [ ] remove typedoc links (not yet supported by website)
1. next branch
    - [x] ~~migrate code to new next branch in gridl repo~~
    - [x] ~~release gridl version @next
        - [Mike Bostok about npm prereleases](https://medium.com/@mbostock/prereleases-and-npm-e778fc5e2420)~~
    - [ ] setup [jsdelivr](https://www.jsdelivr.com/) for umd bundle
1. CI/CD
    - [ ] consider using [semantic-release](https://github.com/semantic-release/semantic-release)
    - [ ] use github ci or travis or similar
    - [ ] build dist
    - [ ] publish to npm
    - [ ] publish to cdn?
    - [ ] tag commit
    - [ ] build docs
1. QA
    - [ ] review code
    - [ ] double check docs for correctness
    - [ ] add tests for readme/guides examples
1. Website
    - [x] ~~make mock-ups with Adboe XD~~
    - [ ] build docs website with gatsby and typedoc
    - [ ] provide examples with [Runkit](https://runkit.com/) like lodash
    - [ ] provide api docs of older versions
    - [ ] provide `Getting started` tutorial
    - [ ] get a good domain (gridl.io / gridl.dev / gridl.com)
    - [ ] link to my portfolio page
    - [ ] Github star button
    - [ ] add carbon ads
    - [ ] donation (buymeacoffee / open collective / patreon)
1. Release
    - [ ] release gridl version 0.11.0

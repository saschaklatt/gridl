import copy from "rollup-plugin-copy";
import typescript from 'rollup-plugin-typescript2';
import generatePackageJson from "rollup-plugin-generate-package-json";
import {terser} from "rollup-plugin-terser";
import visualizer from 'rollup-plugin-visualizer';

const bundleName = "gridl";
const sourceDir = "src";
const outputDir = "dist";

const getOutputFileConf = (format, minified = false) => {
    const fileEnding = minified ? "min.js" : "js";
    const file = `${outputDir}/_${format}/index.${fileEnding}`;
    const plugins = minified ? [terser()] : undefined;
    return {file, format, plugins, sourcemap: true, name: bundleName};
};

const getOutputDirConf = (format, minified = false) => ({
    format,
    plugins: minified ? [terser()] : undefined,
    dir: outputDir,
    sourcemap: false,
    name: bundleName,
});

const buildEsmFiles = () => ({
    input: `${sourceDir}/index.ts`,
    output: [
        getOutputDirConf("esm", true),
    ],
    preserveModules: true,
    plugins: [
        visualizer({template: "treemap", filename: `stats/esm.html`}),
        typescript(),
        generatePackageJson({
            outputFolder: outputDir,
            baseContents: (basePkg) => ({
                name: basePkg.name,
                version: basePkg.version,
                author: basePkg.author,
                license: basePkg.license,
                module: basePkg.module,
                funding: basePkg.funding,
                main: "index.js",
                typings: "index.d.ts",
                files: [
                    "_umd/",
                    "LICENSE",
                    "index.js",
                    "core/index.js",
                    "neighbours/index.js",
                    "reducers/index.js",
                    "search/index.js",
                    "sideEffects/index.js",
                    "transformers/index.js",
                    "index.d.js",
                    "README.md",
                ],
            }),
        }),
        copy({
            targets: [
                {src: './LICENSE', dest: outputDir},
                {src: './README.md', dest: outputDir},
            ],
        }),
    ],
});

const buildUmdBundle = () => ({
    input: `${sourceDir}/index.ts`,
    output: [
        getOutputFileConf("umd", true),
        getOutputFileConf("umd"),
    ],
    plugins: [
        visualizer({template: "treemap", filename: `stats/umd.html`}),
        typescript(),
    ],
});

export default [
    buildEsmFiles(),
    buildUmdBundle(),
];

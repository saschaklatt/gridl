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
        visualizer({template: "treemap", filename: "stats/esm.html"}),
        typescript(),
        generatePackageJson({
            outputFolder: outputDir,
            baseContents: (basePkg) => ({
                author: basePkg.author,
                bugs: basePkg.bugs,
                funding: basePkg.funding,
                homepage: basePkg.homepage,
                keywords: basePkg.keywords,
                license: basePkg.license,
                main: "index.js",
                module: basePkg.module,
                name: basePkg.name,
                repository: basePkg.repository,
                typings: "index.d.ts",
                version: basePkg.version,
            }),
        }),
        copy({
            targets: [
                {src: "./LICENSE", dest: outputDir},
                {src: "./README.md", dest: outputDir},
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
        visualizer({template: "treemap", filename: "stats/umd.html"}),
        typescript(),
    ],
});

export default [
    buildEsmFiles(),
    buildUmdBundle(),
];

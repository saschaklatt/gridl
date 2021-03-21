module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "json", "d.ts", "ts", "node"],
    coverageDirectory: "coverage",
    coverageReporters: [
        "json-summary",
        "json",
        "lcov",
        "text",
        "clover",
    ],
};

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "json", "d.ts", "ts", "node"],
    modulePathIgnorePatterns: ["<rootDir>/dist"],
    coverageDirectory: "coverage",
    coverageReporters: [
        "json-summary",
        "json",
        "lcov",
        "text",
        "clover",
    ],
};

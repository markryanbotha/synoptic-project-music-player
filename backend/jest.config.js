module.exports = {
    name: "backend",
    displayName: "Backend Tests",
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}

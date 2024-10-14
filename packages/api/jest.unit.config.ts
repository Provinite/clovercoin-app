import type { JestConfigWithTsJest } from "ts-jest";
import { defaultsESM } from "ts-jest/presets";

const config: JestConfigWithTsJest = {
  ...defaultsESM,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        compiler: "typescript",
        tsconfig: "./tsconfig.json",
      },
    ],
  },
  setupFiles: ["./src/test/preEnvSetup.ts"],
  coverageReporters: [
    "html",
    [
      "text",
      {
        file: "coverage.txt",
      },
    ],
  ],
  coverageDirectory: "./coverage/unit/",
  collectCoverageFrom: ["src/**/!(*.spec).ts", "!src/seeds/**", "!src/test/**"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.m?js$": "$1",
  },
  testEnvironment: "node",
  testMatch: ["**/*.unit.spec.ts"],
  resetMocks: true,
  restoreMocks: true,
  clearMocks: true,
};

export default config;

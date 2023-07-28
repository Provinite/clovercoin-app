import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.m?js$": "$1",
  },

  testEnvironment: "node",
  testMatch: ["**/*.unit.spec.ts"],
};

export default config;

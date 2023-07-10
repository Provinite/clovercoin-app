import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  testMatch: ["**/*.integration.spec.ts"],
  extensionsToTreatAsEsm: [".mts", ".ts"],
  setupFiles: ["./src/test/preEnvSetup.ts"],
  setupFilesAfterEnv: ["./src/test/globalSetup.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.m?js$": "$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  rootDir: ".",
};

export default config;

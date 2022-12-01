import { JestConfigWithTsJest } from "ts-jest/dist/types";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  testMatch: ["**/*.integration.spec.ts"],
  setupFiles: ["./src/test/preEnvSetup.ts"],
  setupFilesAfterEnv: ["./src/test/globalSetup.ts"],
};

export default config;

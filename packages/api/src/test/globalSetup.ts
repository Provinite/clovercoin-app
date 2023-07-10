import { shutdown } from "./preEnvSetup.js";
import { setupTestClient } from "./testClient.js";
import { beforeAll, afterAll } from "@jest/globals";
beforeAll(() => {
  setupTestClient();
});

afterAll(async () => {
  await shutdown();
});

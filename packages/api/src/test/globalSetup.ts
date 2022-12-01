import { shutdown } from "./preEnvSetup";
import { setupTestClient } from "./testClient";
import { beforeAll, afterAll } from "@jest/globals";
beforeAll(() => {
  setupTestClient();
});

afterAll(async () => {
  await shutdown();
});

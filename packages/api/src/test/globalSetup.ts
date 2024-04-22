import { shutdown } from "./preEnvSetup.js";
import { setupTestClient } from "./testClient.js";
import { beforeAll, afterAll } from "@jest/globals";
import { registerAdminUser } from "./integration/register.js";
import { setAdminUser } from "./integration/integrationCache.js";
import { loginTestClient, logoutTestClient } from "./integration/login.js";
beforeAll(async () => {
  setupTestClient();
  const adminUser = await registerAdminUser();

  if (adminUser.register.__typename !== "LoginSuccessResponse") {
    throw new Error(
      `Failed to create Admin User in global setup. Received error from register mutation: ${adminUser.register.__typename}`
    );
  }
  setAdminUser(adminUser.register);
  loginTestClient(adminUser.register.token);
});

afterAll(async () => {
  setAdminUser(undefined);
  logoutTestClient();
  await shutdown();
});

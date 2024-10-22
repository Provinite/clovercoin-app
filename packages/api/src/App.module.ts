import { EmailModule } from "./business/email/Email.module.js";
import { EnvironmentModule } from "./Environment.module.js";
import { AppGraphqlContext } from "./graphql/AppGraphqlContext.js";
import { Module } from "./modules/Module.js";
import { LoggerModule } from "./util/Logger.module.js";

/**
 * Root module definition for the application.
 */
export const AppModule = Module.define<AppGraphqlContext>({
  name: "AppModule",
  entries: {},
  imports: [EmailModule, EnvironmentModule, LoggerModule],
});

import { Lifetime } from "awilix";
import { Logger } from "winston";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Module } from "../modules/Module.js";
import { logger } from "./logger.js";

export const LoggerModule = Module.define<AppGraphqlContext>({
  name: "LoggerModule",
  entries: {
    logger: {
      factory: ({ contextName }) => {
        return logger.child({ contextName });
      },
      lifetime: Lifetime.SCOPED,
    },
  },
  imports: [],
});

declare module "../graphql/AppGraphqlContext.js" {
  interface AppGraphqlContext {
    logger: Logger;
  }
}

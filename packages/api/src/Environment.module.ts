import { Lifetime } from "awilix";
import {
  getAppEnvironment,
  getBootstrapEnvironment,
  getS3Environment,
  getSesEnvironment,
} from "./environment.js";
import { AppGraphqlContext } from "./graphql/AppGraphqlContext.js";
import { Module } from "./modules/Module.js";
import { s3Config } from "./s3/s3Config.js";
import { sesConfig } from "./ses/sesConfig.js";

export const EnvironmentModule = Module.define<AppGraphqlContext>({
  name: "EnvironmentModule",
  entries: {
    sesEnvironment: {
      factory: getSesEnvironment,
      lifetime: Lifetime.SINGLETON,
    },
    sesConfig: {
      factory: sesConfig,
      lifetime: Lifetime.SINGLETON,
    },
    s3Environment: {
      factory: getS3Environment,
      lifetime: Lifetime.SINGLETON,
    },
    s3Config: {
      factory: s3Config,
      lifetime: Lifetime.SINGLETON,
    },
    appEnvironment: {
      factory: getAppEnvironment,
      lifetime: Lifetime.SINGLETON,
    },
    bootstrapEnvironment: {
      factory: getBootstrapEnvironment,
      lifetime: Lifetime.SINGLETON,
    },
  },
  imports: [],
});

declare module "./graphql/AppGraphqlContext.js" {
  export interface AppGraphqlContext {
    bootstrapEnvironment: ReturnType<typeof getBootstrapEnvironment>;
    s3Environment: ReturnType<typeof getS3Environment>;
    sesEnvironment: ReturnType<typeof getSesEnvironment>;
    sesConfig: ReturnType<typeof sesConfig>;
    appEnvironment: ReturnType<typeof getAppEnvironment>;
  }
}

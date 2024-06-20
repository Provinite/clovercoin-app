import { asClass, asValue, Constructor } from "awilix";
import { createContainer } from "../awilix/createContainer.js";
import { register } from "../awilix/register.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

type Providers<T> = Partial<{ [K in keyof T]: T[K] | Constructor<any> }>;

export const createTestContainer = (
  provides: Providers<AppGraphqlContext> = {}
) => {
  const container = createContainer<AppGraphqlContext>();
  for (const [key, value] of Object.entries(provides)) {
    if (typeof value === "function") {
      register(
        container,
        key as keyof AppGraphqlContext,
        asClass(value as any).singleton()
      );
    } else {
      register(container, key as keyof AppGraphqlContext, asValue(value));
    }
  }
  return container;
};

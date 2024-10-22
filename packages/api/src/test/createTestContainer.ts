const { asClass, asValue } = jest.requireActual("awilix");
import type { Constructor } from "awilix";
import { BaseCradleType } from "../awilix/BaseCradleType.js";
import { createContainer } from "../awilix/createContainer.js";
import { register } from "../awilix/register.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

type Providers<T> = Partial<{ [K in keyof T]: T[K] | Constructor<any> }>;

export const createTestContainer = <
  T extends BaseCradleType<T> = AppGraphqlContext
>(
  provides: Providers<T> = {}
) => {
  const container = createContainer<T>();
  for (const [key, value] of Object.entries(provides)) {
    if (typeof value === "function") {
      register(container, key as keyof T, asClass(value as any).scoped());
    } else {
      register(container, key as keyof T, asValue(value));
    }
  }
  return container;
};

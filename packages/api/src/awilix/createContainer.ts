import {
  asValue,
  AwilixContainer,
  createContainer as createAwilixContainer,
} from "awilix";
import { BaseCradleType } from "./BaseCradleType.js";
import { register } from "./register.js";

export const createContainer = <T extends BaseCradleType<T>>(
  name: string = "root"
): AwilixContainer<T> => {
  const container = createAwilixContainer<T>();
  register(container, "container", asValue(container));
  register(container, "contextName", asValue(name));
  return container;
};

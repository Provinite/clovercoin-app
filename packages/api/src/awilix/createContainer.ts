import {
  asValue,
  AwilixContainer,
  createContainer as createAwilixContainer,
} from "awilix";
import { BaseCradleType } from "./BaseCradleType";
import { register } from "./register";

export const createContainer = <
  T extends BaseCradleType<T>
>(): AwilixContainer<T> => {
  const container = createAwilixContainer<T>();
  register<BaseCradleType<T>, "container">(
    container,
    "container",
    asValue(container)
  );

  return container;
};

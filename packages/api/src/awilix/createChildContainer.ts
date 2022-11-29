import { asValue, AwilixContainer } from "awilix";
import { BaseCradleType } from "./BaseCradleType";
import { register } from "./register";

export function createChildContainer<
  P extends BaseCradleType<P>,
  T extends BaseCradleType<T> = P
>(parentContainer: AwilixContainer<P>, name: string): AwilixContainer<P> {
  const parentContainerName = parentContainer.resolve("contextName");
  const childContainer = parentContainer.createScope<T>();
  register<BaseCradleType<T>, "container">(
    childContainer,
    "container",
    asValue(childContainer)
  );

  register<BaseCradleType<T>, "parentContainer">(
    childContainer,
    "parentContainer",
    asValue(parentContainer)
  );

  register(
    childContainer,
    "contextName",
    asValue(`${parentContainerName}.${name}`)
  );

  return childContainer;
}

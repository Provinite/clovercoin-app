import { asValue, AwilixContainer } from "awilix";
import { BaseCradleType } from "./BaseCradleType";
import { register } from "./register";

export function createChildContainer<
  P extends BaseCradleType<P>,
  T extends BaseCradleType<T> = P
>(parentContainer: AwilixContainer<P>): AwilixContainer<P> {
  const childContainer = parentContainer.createScope<T>();
  register<BaseCradleType<T>, "container">(
    childContainer,
    "container",
    asValue(childContainer)
  );

  return childContainer;
}

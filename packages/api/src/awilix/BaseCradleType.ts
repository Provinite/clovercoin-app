import { AwilixContainer } from "awilix";

export type BaseCradleType<T extends Record<string, unknown>> = {
  container: AwilixContainer<T>;
  parentContainer: AwilixContainer;
  contextName: string;
};

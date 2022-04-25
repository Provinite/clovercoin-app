import { AwilixContainer } from "awilix";

export type BaseCradleType<T extends {}> = {
  container: AwilixContainer<T>;
};

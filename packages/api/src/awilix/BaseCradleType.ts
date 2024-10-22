import { AwilixContainer } from "awilix";

/**
 * Core elements of every awilix container in the app. Contains
 * utility info about the container itself.
 *
 * @template T - The cradle type for the container.
 */
export type BaseCradleType<T> = {
  /**
   * Self-reference to this conmtainer
   */
  container: AwilixContainer<
    T & Pick<BaseCradleType<T>, "parentContainer" | "contextName">
  >;
  /**
   * Reference to this container's parent.
   */
  parentContainer: AwilixContainer;
  /**
   * Name of the context this container is used in. Used for
   * logging and debugging.
   */
  contextName: string;
};

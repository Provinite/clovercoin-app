import { createLoaderDataHook } from "../../utils/loaderDataUtils";

/**
 * Retrive the species traits specified by the current url.
 */
export const useRouteTraits = createLoaderDataHook(
  "root.community.species.traits"
);

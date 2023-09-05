import { createRequiredLoaderDataHook } from "../../utils/loaderDataUtils";

/**
 * Retrive the species traits specified by the current url.
 */
export const useRouteTraitsOrFail = createRequiredLoaderDataHook(
  "root.community.species.traits"
);

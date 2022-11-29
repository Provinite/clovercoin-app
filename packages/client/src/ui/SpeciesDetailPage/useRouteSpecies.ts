import { createLoaderDataHook } from "../../utils/loaderDataUtils";

/**
 * Hook to retrieve the current species loaded on the species detail
 * route.
 */
export const useRouteSpecies = createLoaderDataHook("root.community.species");

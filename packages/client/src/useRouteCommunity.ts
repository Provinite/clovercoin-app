import { createLoaderDataHook } from "./utils/loaderDataUtils";

/**
 * Retrieve the community specified by the current route.
 */
export const useRouteCommunity = createLoaderDataHook("root.community");

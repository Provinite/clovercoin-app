/**
 * @file Utilities for interacting with loader data from
 * react components
 */

import {
  useActionData,
  useRouteLoaderData as reactRouterDomUseRouteLoaderData,
} from "react-router-dom";
import { LoaderData, ActionData, RouteId, RouteType } from "../routes";

/**
 * Create a type-safe useRouteLoderData hook for a specific route.
 * @param routeId
 * @returns
 */
export function createLoaderDataHook<T extends RouteId>(routeId: T) {
  return () => useRouteLoaderData(routeId);
}

export function createRequiredLoaderDataHook<T extends RouteId>(routeId: T) {
  return () => useRouteLoaderDataOrFail(routeId);
}

/**
 * Type-safe wrapper for useRouteLoaderData from react-router-dom.
 * Customized for this application specifically.
 * @param routeId
 * @returns
 */
export function useRouteLoaderData<
  T extends RouteId,
  L = LoaderData<RouteType<T>>
>(routeId: T): L | undefined {
  return reactRouterDomUseRouteLoaderData(routeId) as L | undefined;
}

export function useRouteLoaderDataOrFail<
  T extends RouteId,
  L = LoaderData<RouteType<T>>
>(routeId: T): L {
  const result = useRouteLoaderData(routeId);
  if (!result) {
    throw new Error(
      "Invariant violation: Component canot be used outside of the specified loader context."
    );
  }
  return result;
}

/**
 * Create a type-safe useRouteLoderData hook for a specific route.
 * @param routeId
 * @returns
 */
export function createActionDataHook<T extends RouteId>() {
  return () => useRouteActionData<T>();
}

/**
 * Type-safe wrapper for useRouteLoaderData from react-router-dom.
 * Customized for this application specifically.
 * @param routeId
 * @returns
 */
export function useRouteActionData<
  T extends RouteId,
  A = ActionData<RouteType<T>>
>(): A {
  return useActionData() as A;
}

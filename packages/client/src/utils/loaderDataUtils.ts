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

/**
 * Type-safe wrapper for useRouteLoaderData from react-router-dom.
 * Customized for this application specifically.
 * @param routeId
 * @returns
 */
export function useRouteLoaderData<
  T extends RouteId,
  L = LoaderData<RouteType<T>>
>(routeId: T): L {
  return reactRouterDomUseRouteLoaderData(routeId) as L;
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

/**
 * @file This file contains the main react-router-dom route objects
 * for the entire application, as well as type utilities to improve
 * type-safety when interacting with react-router-dom.
 */
import { isCommunity, isNotAuthenticatedError } from "@clovercoin/api-client";
import {
  useRouteError,
  NonIndexRouteObject,
  IndexRouteObject,
  Navigate,
  redirect,
} from "react-router-dom";
import { Application } from "./Application";
import { graphqlService } from "./graphql/client";
import { aboutRoutes } from "./ui/AboutPage/aboutRoutes";
import { identityRoute } from "./ui/admin/identityRoute";
import { adminRoutes } from "./ui/admin/routes/adminRoutes";
import { AppRoutes } from "./ui/AppRoutes";
import { communityListRoutes } from "./ui/CommunityListPage/communityListRoutes";
import { communitySettingsRoutes } from "./ui/CommunitySettingsPage/communitySettingsRoutes";
import { loginRoutes } from "./ui/LoginPage/loginRoutes";
import { SpeciesDetailRoutes } from "./ui/SpeciesDetailPage/routes/SpeciesDetailRoutes";
import { speciesListRoutes } from "./ui/SpeciesListPage/speciesListRoutes";
import { userSettingsRoutes } from "./ui/UserSettingsPage/userSettingsRoutes";
import { PrettyPrintJson } from "./ui/util/PrettyPrintJson";
import { makeLoader } from "./utils/loaderUtils";
import { globalSnackbarTopic } from "./utils/observables/topics/globalSnackbarTopic";

const PrintError = () => {
  const error = useRouteError();
  console.log(error);
  return <PrettyPrintJson value={error} />;
};

const communityDetailLoader = makeLoader(
  {
    slugs: { communityId: true },
  },
  async ({ ids: { communityId } }) => {
    const result = await graphqlService.getCommunity({
      variables: {
        filters: {
          id: communityId,
        },
      },
    });

    if (isCommunity(result.data.community)) {
      return result.data.community;
    }
    if (isNotAuthenticatedError(result.data.community)) {
      return result.data.community;
    }
    throw new Error(
      `${result.data.community.__typename}: ${result.data.community.message}`
    );
  }
);
/**
 * Main react router dom configuration for the application.
 */
export const routes = [
  typedRouteConfig({
    id: "root",
    element: <Application />,
    errorElement: <PrintError />,
    children: [
      ...aboutRoutes(),
      ...loginRoutes(),
      typedRouteConfig({
        id: "root.authBarrier",
        loader: async () => {
          if (!graphqlService.isClientAuthenticated()) {
            globalSnackbarTopic.simpleError.publish(
              "You are not logged in, or your session has expired. Please log in again"
            );
            return redirect(AppRoutes.login());
          }
        },
        children: [
          communityListRoutes,
          ...adminRoutes(),
          {
            index: true,
            id: "root.index",
            element: <Navigate to={AppRoutes.communityList()} replace={true} />,
          },
          {
            id: "root.community",
            path: "community/:communityId",
            loader: communityDetailLoader,
            children: [
              SpeciesDetailRoutes(),
              speciesListRoutes,
              ...communitySettingsRoutes(),
            ],
          },
          identityRoute,
          ...userSettingsRoutes,
        ],
      } as const),
    ],
  }),
];

/**
 * Here be dragons. This stuff seems really unstable and might need to
 * be removed at some point. Occasionally it breaks when making changes
 * to routes for no reason. I think something is set up badly in a way
 * that is causing massive resource consumption from the ts compiler.
 *
 * Probably all the searching of these deeply nested structures.
 */

interface RouteWithId<T extends string> {
  readonly id: T;
  children?: readonly RouteWithId<T>[];
}

type RootRouteType = typeof routes[0];
type GetRouteIds<R extends RouteWithId<string>> = R extends RouteWithId<infer U>
  ? U
  : never;

/**
 * Union of all route ids in the application
 */
export type RouteId = GetRouteIds<RootRouteType>;

export type TypedNonIndexRouteObject<RouteId extends string = string> = Omit<
  NonIndexRouteObject,
  "children" | "id"
> & {
  readonly id: RouteId;
  readonly children?: readonly TypedRouteConfig<RouteId>[];
};

export type TypedIndexRouteObject<RouteId extends string = string> = Omit<
  IndexRouteObject,
  "id"
> & { readonly id: RouteId };
/**
 * More strictly-typed variant of the RouteObject from
 * react-router-dom with some custom config.
 */
export type TypedRouteConfig<RouteId extends string = string> =
  | TypedNonIndexRouteObject<RouteId>
  | TypedIndexRouteObject<RouteId>;

/**
 * Create a strongly typed react router RouterObject.
 *
 * @note Use `as const` for MAXIMUM TYPE SAFETY.
 */
export function typedRouteConfig<
  R extends string,
  T extends TypedRouteConfig<R>
>(t: T) {
  return t;
}

/**
 * Get the type of the route definition for a specific route
 */
export type RouteType<R extends RouteId, T = typeof routes[number]> = WithId<
  T,
  R
> extends never
  ? Children<T> extends never
    ? never
    : RouteType<R, Children<T>>
  : WithId<T, R>;

/**
 * Type of the data returned by the loader of the specified route
 * @example
 * type T = LoaderData<RouteType<"root">>
 */
export type LoaderData<Route extends Record<string, any>> =
  Route["loader"] extends (...args: any[]) => any
    ? Awaited<ReturnType<Route["loader"]>>
    : never;

/**
 * Type of the data returned by the action of the specified route. The `Response`
 * type is filtered out of this result, as that is generally not intended to be
 * consumed by the app (and won't actually be returned into related hook calls).
 * Additionally, {@link NotAuthenticatedError} is handled by a global middleware
 * in the `makeAction` utility, and will be converted to a redirect before being
 * returned from an action.
 * @example
 * type T = LoaderData<RouteType<"root">>
 * */
export type ActionData<Route extends Record<string, any>> =
  Route["action"] extends (...args: any[]) => any
    ? Awaited<ReturnType<Route["action"]>>
    : never;

/**
 * Extract items from the provided union that have a
 * readonly `children` array
 */
type WithChildren<UnionType> = UnionType extends { children: readonly any[] }
  ? UnionType
  : never;

/**
 * Turn a union of route config objects into a union of
 * their children
 */
type Children<UnionType> = WithChildren<UnionType>["children"][number];

/**
 * Extract items from the provided union that have an
 * `id` field matching type `R`.
 */
type WithId<UnionType, IdType> = UnionType extends { id: IdType }
  ? UnionType
  : never;

export function forEachRoute<K extends RouteId>(
  enterRoute: (route: TypedRouteConfig) => void,
  exitRoute: (route: TypedRouteConfig) => void,
  rootRoutes: TypedRouteConfig<K>[]
) {
  for (const route of rootRoutes) {
    enterRoute(route);
    for (const child of route.children ?? []) {
      forEachRoute(enterRoute, exitRoute, [child]);
    }
    exitRoute(route);
  }
}

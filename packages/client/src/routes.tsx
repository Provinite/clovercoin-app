/**
 * @file This file contains the main react-router-dom route objects
 * for the entire application, as well as type utilities to improve
 * type-safety when interacting with react-router-dom.
 */
import { ApolloError } from "@apollo/client";
import {
  Navigate,
  useRouteError,
  NonIndexRouteObject,
  IndexRouteObject,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "react-router-dom";
import { Application } from "./Application";
import { graphqlService } from "./client";
import { SpeciesDetailRoutes } from "./ui/SpeciesDetailPage/SpeciesDetailRoutes";
import { SpeciesListProvider } from "./ui/SpeciesListPage/SpeciesListProvider";
import { PrettyPrintJson } from "./ui/util/PrettyPrintJson";
import { slugToUuid } from "./utils/uuidUtils";

const PrintError = () => {
  const error = useRouteError();
  console.log(error);
  return <PrettyPrintJson value={error} />;
};

/**
 * Main react router dom configuration for the application.
 */
export const routes = [
  typedRouteConfig({
    id: "root",
    element: <Application />,
    errorElement: <PrintError />,
    children: [
      {
        id: "root.community",
        path: "community/:communityId",
        loader: async ({ params: { communityId } }: LoaderFunctionArgs) => {
          if (!communityId) {
            throw new Error("Missing community id in route");
          }
          communityId = slugToUuid(communityId);
          const result = await graphqlService.getCommunity({
            variables: {
              filters: {
                id: communityId,
              },
            },
          });

          return result.data?.community;
        },
        children: [
          {
            id: "root.community.index",
            index: true,
            element: <Navigate to="species" />,
          },
          {
            id: "root.community.species-list",
            path: "species",
            element: <SpeciesListProvider />,
            errorElement: <SpeciesListProvider />,
            loader: async ({ params: { communityId } }: LoaderFunctionArgs) => {
              if (!communityId) {
                throw new Error("Missing community id in route");
              }
              communityId = slugToUuid(communityId);
              const result = await graphqlService.getSpeciesListView({
                variables: {
                  communityId,
                },
              });

              return result.data;
            },
            action: async ({
              params: { communityId: communitySlug },
              request,
            }: ActionFunctionArgs) => {
              if (request.method === "POST") {
                const formData = await request.formData();

                if (!communitySlug) {
                  throw new Error("Missing community id in route");
                }
                const communityId = slugToUuid(communitySlug);
                try {
                  await graphqlService.createSpecies({
                    variables: {
                      input: {
                        communityId: communityId,
                        name: formData.get("name") as string,
                        iconUrl: formData.get("iconUrl") as string,
                      },
                    },
                    update(cache) {
                      // bop any cached species list queries for this community
                      cache.modify({
                        fields: {
                          species: (_data, { DELETE, storeFieldName }) => {
                            if (storeFieldName.includes(communityId)) {
                              return DELETE;
                            }
                          },
                        },
                      });
                    },
                  });
                } catch (err) {
                  return err as ApolloError;
                }
              }
            },
          },
          /**
           * Register the species detail routes. Noting this here
           * because it's kind of easy to miss and could use some
           * highlighting when scanning this file.
           */
          SpeciesDetailRoutes,
        ],
      },
    ],
  } as const),
] as const;

// Here be dragons

/**
 * Union of all route ids in the application
 */
export type RouteId = typeof routes[0] extends TypedRouteConfig<infer U>
  ? U
  : never;

/**
 * More strictly-typed variant of the RouteObject from
 * react-router-dom.
 */
export type TypedRouteConfig<RouteId extends string = string> =
  | (Omit<NonIndexRouteObject, "children" | "id"> & {
      id: RouteId;
      readonly children?: readonly TypedRouteConfig<RouteId>[];
    })
  | (Omit<IndexRouteObject, "id"> & { id: RouteId });

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
 * Type of the data returned by the action of the specified route
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

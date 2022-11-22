import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { FunctionComponent } from "react";
import { render } from "react-dom";
import {
  createRoutesFromChildren,
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CritterTraitValueType, GraphqlService } from "./generated/graphql";
import {
  HeaderBarContext,
  HeaderBarContextType,
} from "./ui/HeaderBar/HeaderBarContext";
import { AddTraitCard } from "./ui/SpeciesDetailPage/AddTraitCard/AddTraitCard";
import { SpeciesDetailPageProvider } from "./ui/SpeciesDetailPage/SpeciesDetailPageProvider";
import { SpeciesSummaryCard } from "./ui/SpeciesDetailPage/SummaryCard/SpeciesSummaryCard";
import { TraitListCard } from "./ui/SpeciesDetailPage/TraitListCard/TraitListCard";
import { TraitListDetailCard } from "./ui/SpeciesDetailPage/TraitListDetailCard/TraitListDetailCard";
import { TraitListListCard } from "./ui/SpeciesDetailPage/TraitListListCard/TraitListListCard";
import { SpeciesListProvider } from "./ui/SpeciesListPage/SpeciesListProvider";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
const client = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
  // To disable caching entirely:
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: "no-cache",
  //     errorPolicy: "ignore",
  //   },
  //   query: {
  //     fetchPolicy: "no-cache",
  //     errorPolicy: "all",
  //   },
  // },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    contrastThreshold: 4.5,
  },
  typography: {},
});
console.log({ darkTheme });

const graphqlService = new GraphqlService(client);

export const App: FunctionComponent = () => {
  const [headerBarContext] = useState<HeaderBarContextType>(() => ({
    props: {
      title: "",
      userIconUrl: "http://placekitten.com/100/100",
      userName: "Prov",
    },
  }));
  return (
    <ThemeProvider theme={darkTheme}>
      <EmotionThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <HeaderBarContext.Provider value={headerBarContext}>
            <Paper
              css={{
                display: "flex",
                flexGrow: 1,
                alignSelf: "stretch",
                flexDirection: "column",
              }}
              elevation={0}
            >
              <Outlet />
            </Paper>
          </HeaderBarContext.Provider>
        </ApolloProvider>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
};
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<App />}>
      <Route
        id="community"
        path="community/:communityId"
        loader={async ({ params: { communityId } }) => {
          if (!communityId) {
            throw new Error("Missing community id in route");
          }
          const result = await graphqlService.getCommunity({
            variables: {
              filters: {
                id: communityId,
              },
            },
          });

          return result.data.communities[0];
        }}
      >
        <Route path="" element={<Navigate to="species" />} />
        <Route
          path="species"
          element={<SpeciesListProvider />}
          loader={async ({ params: { communityId } }) => {
            if (!communityId) {
              throw new Error("Missing community id in route");
            }
            const result = await graphqlService.getSpeciesListView({
              variables: {
                communityId,
              },
            });

            return result.data;
          }}
          action={async ({ params: { communityId }, request }) => {
            if (request.method === "POST") {
              const formData = await request.formData();

              if (!communityId) {
                throw new Error("Missing community id in route");
              }

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
            }
          }}
        />
        <Route
          id="species.detail"
          path="species/:speciesId"
          loader={async ({ params: { communityId, speciesId } }) => {
            if (!communityId) {
              throw new Error("Missing community id in route");
            }

            const result = await graphqlService.getSpeciesDetail({
              variables: {
                filters: {
                  id: speciesId,
                  communityId,
                },
              },
            });

            return result.data.species[0];
          }}
        >
          <Route path="" element={<SpeciesDetailPageProvider />}>
            <Route path="" element={<SpeciesSummaryCard />} />
            <Route
              path="traits"
              action={async ({ params, request }) => {
                if (request.method === "POST") {
                  const { speciesId } = params;
                  const formData = await request.formData();
                  await graphqlService.createSpeciesTrait({
                    variables: {
                      input: {
                        name: formData.get("name") as string,
                        valueType: formData.get(
                          "dataType"
                        ) as CritterTraitValueType,
                        speciesId: speciesId as string,
                        enumValues: formData
                          .getAll("enumValues")
                          .filter((v) => typeof v === "string" && v !== "")
                          .map((name) => ({ name: name as string })),
                      },
                    },
                  });
                }
              }}
              loader={async ({ params: { speciesId } }) => {
                const result = await graphqlService.getSpeciesTraits({
                  variables: {
                    filters: {
                      speciesId: speciesId!,
                    },
                  },
                });

                return result.data;
              }}
              element={<TraitListCard />}
            />
            <Route path="traits/add" element={<AddTraitCard />} />
            <Route path="trait-lists" element={<TraitListListCard />}></Route>
            <Route
              path="trait-lists/:traitListId"
              element={<TraitListDetailCard />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

render(<RouterProvider router={router} />, document.querySelector("#app"));

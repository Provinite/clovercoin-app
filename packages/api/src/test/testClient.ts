import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { GraphqlService } from "@clovercoin/api-client";

export let testApolloClient: ApolloClient<any>;
export let testClient: GraphqlService;

export const setupTestClient = () => {
  const { port } = global.ccAppAddress!;
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `http://localhost:${port}/`,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });

  testApolloClient = client;

  testClient = new GraphqlService(testApolloClient);
};

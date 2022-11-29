/**
 * @file This file contains the main Apollo graphql client,
 * as well as an imperative service to interact with it
 * outside of `useQuery`/`useMutation` hooks.
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphqlService } from "./generated/graphql";

/**
 * GraphQL client to use throughout the application.
 * This should not generally be used directly. Prefer
 * `useQuery`/`useMutation` for data fetching in react
 * components, and {@link graphqlService} for imperative
 * style graphql operations.
 */
export const client = new ApolloClient({
  uri: "http://localhost:3000/",
  cache: new InMemoryCache(),
});

/**
 * Service for imperative interaction with the
 * GraphQL API.
 */
export const graphqlService = new GraphqlService(client);

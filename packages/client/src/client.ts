/**
 * @file This file contains the main Apollo graphql client,
 * as well as an imperative service to interact with it
 * outside of `useQuery`/`useMutation` hooks.
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphqlService, UploadService } from "@clovercoin/api-client";

const host = window.location.host;
const isDev = !host.includes(".com");

const getApiUrl = () => {
  if (isDev) {
    return "//localhost:3000";
  }
  const [subdomain, ...domain] = host.split(".");
  const result = subdomain.match(/(.+?)-app/);
  if (result) {
    return `//${result[1]}-api.${domain.join(".")}`;
  } else {
    return `//api.${domain.join(".")}`;
  }
};

/**
 * GraphQL client to use throughout the application.
 * This should not generally be used directly. Prefer
 * `useQuery`/`useMutation` for data fetching in react
 * components, and {@link graphqlService} for imperative
 * style graphql operations.
 */
export const client = new ApolloClient({
  uri: getApiUrl(),
  cache: new InMemoryCache(),
});

/**
 * Service for imperative interaction with the
 * GraphQL API.
 */
export const graphqlService = new GraphqlService(client);

export const uploadService = new UploadService();

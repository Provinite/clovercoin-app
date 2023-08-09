/**
 * @file This file contains the main Apollo graphql client,
 * as well as an imperative service to interact with it
 * outside of `useQuery`/`useMutation` hooks.
 */
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { GraphqlService, UploadService } from "@clovercoin/api-client";
import { setContext } from "@apollo/client/link/context";
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

let token: string = "";
export const setToken = (newToken: string) => {
  token = newToken;
};

const httpLink = createHttpLink({ uri: getApiUrl() });
const authLink = setContext((_, { headers }) => {
  return token
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    : { headers };
});

/**
 * GraphQL client to use throughout the application.
 * This should not generally be used directly. Prefer
 * `useQuery`/`useMutation` for data fetching in react
 * components, and {@link graphqlService} for imperative
 * style graphql operations.
 */
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/**
 * Service for imperative interaction with the
 * GraphQL API.
 */
export const graphqlService = new GraphqlService(client);

export const uploadService = new UploadService();

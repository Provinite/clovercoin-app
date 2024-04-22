import { GraphQLClient } from "graphql-request";

export let testClient: GraphQLClient;

export const setupTestClient = () => {
  const { port } = global.ccAppAddress!;
  testClient = new GraphQLClient(`http://localhost:${port}/`);
};

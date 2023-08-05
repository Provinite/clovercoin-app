/**
 * @file This seed creates a single user and exports its identity id.
 */
import type { GraphQLClient } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "graphql-tag";
import { v4 } from "uuid";

export default class Seed0001Register {
  async up(client: GraphQLClient) {
    const username = v4();
    const query: TypedDocumentNode<{
      register: { identity: { id: string } };
    }> = gql`
      mutation {
        register(
          input: {
            email: "${username}@example.com"
            password: "123Passw0rd!"
            username: "${username}"
          }
        ) {
          __typename
          ... on LoginResponse {
            identity {
              id
            }
          }
        }
      }
    `;
    return (await client.request(query)).register;
  }
}

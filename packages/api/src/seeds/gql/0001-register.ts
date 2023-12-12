/**
 * @file This seed creates a single bootstrap admin user and
 * exports its identity id.
 */
import type { GraphQLClient } from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "graphql-tag";

export default class Seed0001Register {
  async up(client: GraphQLClient) {
    const query: TypedDocumentNode<{
      register: { identity: { id: string }; token: string };
    }> = gql`
      mutation {
        register(
          input: {
            email: "${process.env.CC_ADMIN_EMAIL}"
            password: "Passw0rd"
            username: "provinite"
            inviteCodeId: "ThisValueDoesntMatterBecauseAnAdmin"
          }
        ) {
          __typename
          ... on LoginSuccessResponse {
            identity {
              id
            }
            token
          }
        }
      }
    `;
    const result = (await client.request(query)).register;
    client.setHeader("Authorization", `Bearer ${result.token}`);
    return result;
  }
}

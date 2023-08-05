/**
 * @file This seed creates a single community with a unique name prefixed with
 * "Cloverse-"
 */
import { CreateCommunityResponse, isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { v4 } from "uuid";
import { logger } from "../../util/logger.js";

export default class Seed0002CreateCommunity {
  async up(client: GraphQLClient) {
    const query: TypedDocumentNode<{
      createCommunity: CreateCommunityResponse;
    }> = gql`
      mutation {
        createCommunity(input: { name: "Cloverse-${v4()}" }) {
          __typename
          ... on Community {
            id
            name
          }
        }
      }
    `;

    const { createCommunity: community } = await client.request(query);
    if (isBaseError(community)) {
      logger.error({
        message: "Error during seed",
        errorName: community.__typename,
        errorMessage: community.message,
        query: "createCommunity",
        error: community,
      });
      throw community;
    }

    return { community };
  }
}

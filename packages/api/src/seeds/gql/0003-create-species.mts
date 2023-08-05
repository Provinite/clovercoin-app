/**
 * @file This seed creates a single species with a unique name prefixed with
 * "Cloverse-"
 */
import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { v4 } from "uuid";
import { logger } from "../../util/logger.js";
import Seed0002CreateCommunity from "./0002-create-community.mjs";
import { GetResultFn } from "./_seeds.mjs";

export default class Seed0003CreateSpecies {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    const { community } = getResult(Seed0002CreateCommunity);
    const query: TypedDocumentNode<{
      createSpecies:
        | {
            __typename: "Species";
            id: string;
            name: string;
          }
        | {
            __typename: "DuplicateError" | "InvalidArgumentError";
            message: string;
          };
    }> = gql`
      mutation {
        createSpecies(input: { communityId: "${
          community.id
        }", name: "Pillowings-${v4()}" }) {
          __typename
          ...on Species {
            id
            name
          }
          ...on BaseError {
            message
          }
          ...on DuplicateError {
            message
          }
          ...on InvalidArgumentError {
            message
          }
        }
      }
    `;

    const { createSpecies: species } = await client.request(query);
    if (isBaseError(species)) {
      logger.error({
        message: "Error during seed",
        errorName: species.__typename,
        errorMessage: species.message,
        query: "createSpecies",
        error: species,
      });
      throw species;
    }

    return { species };
  }
}

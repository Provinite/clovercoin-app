import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { GetResultFn } from "../src/seeds/gql/_seeds.mjs";
import { logger } from "../src/util/logger.js";

export default class __className__ {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(client: GraphQLClient, getResult: GetResultFn) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type MutationVars = {};
    type MutationResult = {
      __mutationName__: // eslint-disable-next-line @typescript-eslint/ban-types
      | {
            __typename: "TODO";
          }
        | {
            __typename: "DuplicateError" | "InvalidArgumentError";
            message: string;
          };
    };
    const query: TypedDocumentNode<MutationResult, MutationVars> = gql`
      mutation __mutationName__() {
        __mutationName__
       {
          __typename
          ... on DuplicateError {
            message
          }
          ... on InvalidArgumentError {
            message
          }
          ... on BaseError {
            message
          }
        }
      }
    `;
    const { __mutationName__ } = await client.request(query);

    if (isBaseError(__mutationName__)) {
      logger.error({
        message: "Error during seed",
        errorName: __mutationName__.__typename,
        errorMessage: __mutationName__.message,
        query: "__mutationName__",
        error: __mutationName__,
      });
      throw __mutationName__;
    }
    return { __mutationName__ };
  }
}

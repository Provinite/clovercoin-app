import { isBaseError } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { GetResultFn } from "../src/seeds/gql/_seeds.mjs";
import { logger } from "../src/util/logger.js";

export default class _className_ {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(client: GraphQLClient, getResult: GetResultFn) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type MutationVars = {};
    type MutationResult = {
      _mutationName_:
        | {
            __typename: "TODO";
          }
        | {
            __typename: "DuplicateError" | "InvalidArgumentError";
            message: string;
          };
    };
    const query: TypedDocumentNode<MutationResult, MutationVars> = gql`
      mutation _mutationName_ {
        _mutationName_ {
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
    const { _mutationName_ } = await client.request(query);

    if (isBaseError(_mutationName_)) {
      logger.error({
        message: "Error during seed",
        errorName: _mutationName_.__typename,
        errorMessage: _mutationName_.message,
        query: "_mutationName_",
        error: _mutationName_,
      });
      throw _mutationName_;
    }
    return { _mutationName_ };
  }
}

import {
  InviteCode,
  InviteCodeCreateInput,
  isBaseError,
} from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { GetResultFn } from "./_seeds.mjs";
import { logger } from "./../../util/logger.js";

export default class Seed0009CreateInviteCode {
  async up(client: GraphQLClient, _getResult: GetResultFn) {
    type MutationVars = {
      input: InviteCodeCreateInput;
    };
    type MutationResult = {
      createInviteCode:
        | Pick<InviteCode, "id">
        | {
            __typename: "DuplicateError" | "InvalidArgumentError";
            message: string;
          };
    };
    const query: TypedDocumentNode<MutationResult, MutationVars> = gql`
      mutation createInviteCode($input: InviteCodeCreateInput!) {
        createInviteCode(input: $input) {
          __typename
          ... on InviteCode {
            id
          }
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
    const { createInviteCode } = await client.request(query, {
      input: {
        id: "mock-invite-code-0",
        maxClaims: 100,
      },
    });

    if (isBaseError(createInviteCode)) {
      logger.error({
        message: "Error during seed",
        errorName: createInviteCode.__typename,
        errorMessage: createInviteCode.message,
        query: "createInviteCode",
        error: createInviteCode,
      });
      throw createInviteCode;
    }
    return { createInviteCode };
  }
}

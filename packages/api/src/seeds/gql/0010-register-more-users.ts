import { isBaseError, RegisterArgs } from "@clovercoin/api-client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { GetResultFn } from "./_seeds.mjs";
import { logger } from "./../../util/logger.js";
import Seed0009CreateInviteCode from "./0009-create-invite-code.js";

export default class Seed0010RegisterMoreUsers {
  async up(client: GraphQLClient, getResult: GetResultFn) {
    type MutationVars = {
      input: RegisterArgs;
    };
    type MutationResult = {
      register:
        | {
            __typename: "LoginSuccessResponse";
          }
        | {
            __typename: "DuplicateError" | "InvalidArgumentError";
            message: string;
          };
    };
    const query: TypedDocumentNode<MutationResult, MutationVars> = gql`
      mutation register($input: RegisterArgs!) {
        register(input: $input) {
          __typename
          ... on LoginSuccessResponse {
            token
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

    for (let i = 0; i < 100; i++) {
      const { register } = await client.request(query, {
        input: {
          email: `provinite+clovercoinappseeduser-${i}@gmail.com`,
          inviteCodeId: getResult(Seed0009CreateInviteCode).createInviteCode.id,
          password: "Passw0rd",
          username: `seededUser${i}`,
        },
      });

      if (isBaseError(register)) {
        logger.error({
          message: "Error during seed",
          errorName: register.__typename,
          errorMessage: register.message,
          query: "register",
          error: register,
        });
        throw register;
      }
    }
  }
}

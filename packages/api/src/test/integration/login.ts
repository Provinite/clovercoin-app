import { graphql } from "../gql/gql.js";
import { LoginArgs } from "../gql/graphql.js";
import { testClient } from "../testClient.js";

export const loginMutation = graphql(`
  mutation login($input: LoginArgs!) {
    login(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        identity {
          id
        }
        token
      }
    }
  }
`);

export const loginToApi = async (input: LoginArgs) => {
  const result = await testClient.request(loginMutation, { input });
  if (result.login.__typename !== "LoginSuccessResponse") {
    throw new Error(`Failed to login to API as ${input.email}`);
  }
  return result.login;
};

export const loginTestClient = (token: string) => {
  testClient.setHeader("Authorization", `Bearer ${token}`);
};

export const logoutTestClient = () => testClient.setHeader("Authorization", "");

export const login = async (input: LoginArgs) => {
  const successResponse = await loginToApi(input);
  loginTestClient(successResponse.token);
  return successResponse;
};

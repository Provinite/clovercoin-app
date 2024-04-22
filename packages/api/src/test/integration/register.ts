import { v4 } from "uuid";
import { graphql } from "../gql/gql.js";
import { testClient } from "../testClient.js";
import { _createInviteCode } from "./_createInviteCode.js";

export const registerMutation = graphql(`
  mutation register($input: RegisterArgs!) {
    register(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        token
        identity {
          id
        }
      }
    }
  }
`);

export const register = async ({
  email = `${v4()}@clovercoin.com`,
  password = "Passw0rd",
  inviteCodeId = undefined as string | undefined,
  username = `integration-user-${v4()}`,
}) => {
  if (!inviteCodeId) {
    const inviteCode = await _createInviteCode({
      id: `integration-user-oneoff-${email}}`,
      maxClaims: 1,
    });
    inviteCodeId = inviteCode.id;
  }
  return testClient.request(registerMutation, {
    input: { email, password, inviteCodeId, username },
  });
};

export const registerAdminUser = async () => {
  const adminEmail = process.env.CC_ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error(
      `Cannot register default admin user. Missing CC_ADMIN_EMAIL env var`
    );
  }
  return testClient.request(registerMutation, {
    input: {
      email: adminEmail,
      inviteCodeId: "JustSomeLegitIshValue",
      password: "Passw0rd",
      username: "integration-test-default-admin-user",
    },
  });
};

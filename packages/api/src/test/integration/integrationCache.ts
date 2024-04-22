import { RegisterMutation } from "../gql/graphql.js";

let adminUser:
  | (RegisterMutation["register"] & {
      __typename: "LoginSuccessResponse";
    })
  | undefined;

export const getAdminUser = () => {
  if (!adminUser) {
    throw new Error(
      `Integration Cache: Cannot fetch adminUser as it was never set`
    );
  }
  return adminUser;
};
export const setAdminUser = (user: typeof adminUser) => {
  adminUser = user;
};

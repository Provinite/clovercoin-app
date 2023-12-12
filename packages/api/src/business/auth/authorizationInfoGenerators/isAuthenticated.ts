import { AuthInfoFn, AuthScope } from "../AuthInfo.js";

export const isAuthenticated = (): AuthInfoFn => () => ({
  scope: AuthScope.Global,
  permissions: [],
});

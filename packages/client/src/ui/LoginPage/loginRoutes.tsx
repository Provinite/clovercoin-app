import { isBaseError } from "@clovercoin/api-client";
import { redirect } from "react-router-dom";
import { graphqlService, setToken } from "../../client";
import { typedRouteConfig } from "../../routes";
import { makeAction } from "../../utils/loaderUtils";
import { AppRoutes } from "../AppRoutes";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const loginRoutes = () => [
  typedRouteConfig({
    id: "root.login",
    element: <LoginPage />,
    path: "login",
    action: loginAction,
  }),
  typedRouteConfig({
    id: "root.register",
    element: <RegisterPage />,
    path: "register",
    action: registerAction,
  }),
];

const loginAction = makeAction(
  {
    allowedMethods: ["post"],
    form: { username: true, password: true },
  },
  async ({ form: { username, password } }) => {
    const {
      data: { login: result },
    } = await graphqlService.login({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
    if (isBaseError(result)) {
      return result;
    }
    setToken(result.token);
    return redirect(AppRoutes.communityList());
  }
);
const registerAction = makeAction(
  {
    allowedMethods: ["post"],
    form: { username: true, password: true, email: true },
  },
  async ({ form: { username, password, email } }) => {
    const {
      data: { register: result },
    } = await graphqlService.register({
      variables: {
        input: {
          username,
          password,
          email,
        },
      },
    });
    if (isBaseError(result)) {
      return result;
    }
    setToken(result.token);
    return redirect(AppRoutes.communityList());
  }
);

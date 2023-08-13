import { isBaseError, isLoginFailureResponse } from "@clovercoin/api-client";
import { Navigate, redirect } from "react-router-dom";
import { graphqlService } from "../../graphql/client";
import { typedRouteConfig } from "../../routes";
import { makeAction, makeLoader } from "../../utils/loaderUtils";
import { AppRoutes } from "../AppRoutes";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
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
    id: "root.logout",
    path: "logout",
    element: <Navigate to={AppRoutes.login()} replace={true} />,
    loader: logoutLoader,
  }),
  typedRouteConfig({
    id: "root.register",
    element: <RegisterPage />,
    path: "register",
    action: registerAction,
  }),
  typedRouteConfig({
    id: "root.forgotPassword",
    element: <ForgotPasswordPage />,
    path: "forgot-password",
    action: forgotPasswordAction,
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
    if (isBaseError(result) || isLoginFailureResponse(result)) {
      return result;
    }
    return redirect(AppRoutes.communityList());
  }
);

const registerAction = makeAction(
  {
    allowedMethods: ["post"],
    form: { username: true, password: true, email: true, inviteCodeId: true },
  },
  async ({ form: { username, password, email, inviteCodeId } }) => {
    const {
      data: { register: result },
    } = await graphqlService.register({
      variables: {
        input: {
          username,
          password,
          email,
          inviteCodeId,
        },
      },
    });
    if (isBaseError(result)) {
      return result;
    }
    return redirect(AppRoutes.communityList());
  }
);

const logoutLoader = makeLoader({}, async () => {
  graphqlService.setClientAuthToken("");
});

const forgotPasswordAction = makeAction(
  {
    allowedMethods: ["post"],
    form: { email: true },
  },
  async ({ form: { email } }) => {
    const {
      data: { requestPasswordReset },
    } = await graphqlService.requestPasswordReset({
      variables: {
        input: {
          email,
        },
      },
    });
    return requestPasswordReset;
  }
);

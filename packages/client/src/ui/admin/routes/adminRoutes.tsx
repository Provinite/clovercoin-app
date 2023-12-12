import { typedRouteConfig } from "../../../routes";
import { AppRoutes } from "../../AppRoutes";
import { AdminPage } from "../AdminPage";
import { inviteCodeAction } from "./admin/invite-code/inviteCodeAction";

export const adminRoutes = () =>
  [
    typedRouteConfig({
      id: "admin",
      path: AppRoutes.admin(),
      children: [
        { index: true, id: "admin.index", element: <AdminPage /> },
        {
          id: "admin.inviteCodes",
          path: "inviteCodes",
          action: inviteCodeAction,
        },
      ],
    }),
  ] as const;

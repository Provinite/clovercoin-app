import { typedRouteConfig } from "../../routes";
import { AppRoutes } from "../AppRoutes";
import { AdminPage } from "./AdminPage";

export const adminRoutes = typedRouteConfig({
  id: "admin",
  path: AppRoutes.admin(),
  element: <AdminPage />,
});

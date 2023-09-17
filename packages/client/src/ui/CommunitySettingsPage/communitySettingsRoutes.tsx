import { typedRouteConfig } from "../../routes";
import { communitySettingsLoader } from "./communitySettingsLoader";
import { CommunitySetttingsPage } from "./CommunitySettingsPage";
import { roleDetailAction } from "./roleDetailAction";

export const communitySettingsRoutes = () => [
  // /community/:communitySlug/settings
  typedRouteConfig({
    id: "root.community.settings",
    path: "settings",
    loader: communitySettingsLoader,
    element: <CommunitySetttingsPage />,
  }),
  // /community/:communitySlug/roles/:roleSlug
  typedRouteConfig({
    id: "root.community.role",
    path: "roles/:roleSlug",
    action: roleDetailAction,
  }),
];

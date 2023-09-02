import { typedRouteConfig } from "../../routes";
import { communitySettingsLoader } from "./communitySettingsLoader";
import { CommunitySetttingsPage } from "./CommunitySettingsPage";

export const communitySettingsRoutes = () => [
  typedRouteConfig({
    id: "root.community.settings",
    path: "settings",
    loader: communitySettingsLoader,
    element: <CommunitySetttingsPage />,
  }),
];

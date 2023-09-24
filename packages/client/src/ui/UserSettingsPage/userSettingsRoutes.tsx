import { typedRouteConfig } from "../../routes";
import { communityInvitationDetailAction } from "./communityInvitationDetailAction";
import { userSettingsLoader } from "./userSettingsLoader";
import { UserSettingsPage } from "./UserSettingsPage";

export const userSettingsRoutes = [
  typedRouteConfig({
    id: "root.settings",
    path: "settings",
    element: <UserSettingsPage />,
    loader: userSettingsLoader,
  }),
  typedRouteConfig({
    id: "root.settings.community-invitation",
    path: "settings/community-invitations/:communityInvitationSlug",
    action: communityInvitationDetailAction,
  }),
] as const;

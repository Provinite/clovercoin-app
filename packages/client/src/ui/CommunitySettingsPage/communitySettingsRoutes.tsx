import { typedRouteConfig } from "../../routes";
import { communityInvitationListAction } from "./communityInvitationListAction";
import { communityMemberDetailAction } from "./communityMemberDetailAction";
import { communityMemberListAction } from "./communityMemberListAction";
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
  // /community/:communitySlug/memberships
  typedRouteConfig({
    id: "root.community.memberships",
    path: "memberships",
    action: communityMemberListAction,
  }),
  // /community/:communitySlug/memberships/:identitySlug/:roleSlug
  typedRouteConfig({
    id: "root.community.membership",
    path: "memberships/:identitySlug/:roleSlug",
    action: communityMemberDetailAction,
  }),
  // /community/:communitySlug/invitations
  typedRouteConfig({
    id: "root.community.invitations",
    path: "invitations",
    action: communityInvitationListAction,
  }),
];

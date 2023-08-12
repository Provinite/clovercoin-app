import { isBaseError, isInviteCodeList } from "@clovercoin/api-client";
import { graphqlService } from "../../graphql/client";
import { typedRouteConfig } from "../../routes";
import { makeAction } from "../../utils/loaderUtils";
import { AppRoutes } from "../AppRoutes";
import { AdminPage } from "./AdminPage";

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

export const inviteCodeAction = makeAction(
  {
    allowedMethods: ["post"],
    form: {
      maxClaims: true,
      id: true,
    },
  },
  async ({ form: { maxClaims, id } }) => {
    const {
      data: { createInviteCode },
    } = await graphqlService.createInviteCode({
      variables: {
        input: {
          creatorId: graphqlService.getTokenPayload().identity.id,
          id,
          maxClaims: Number(maxClaims),
        },
      },
      update: (cache, { data }) => {
        if (!data || isBaseError(data.createInviteCode)) {
          return;
        }
        cache.modify({
          fields: {
            inviteCodes: (value, { DELETE }) => {
              if (isInviteCodeList(value)) {
                return DELETE;
              }
              return value;
            },
          },
        });
      },
    });

    if (isBaseError(createInviteCode)) {
      return createInviteCode;
    }
  }
);

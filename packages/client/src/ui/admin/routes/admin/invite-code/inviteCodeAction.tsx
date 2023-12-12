import { isBaseError, isInviteCodeList } from "@clovercoin/api-client";
import { graphqlService } from "../../../../../graphql/client";
import { makeAction } from "../../../../../utils/loaderUtils";

export const inviteCodeAction = makeAction(
  {
    allowedMethods: ["post"],
    form: {
      maxClaims: true,
      id: true,
      roleId: false,
    },
  },
  async ({ form: { maxClaims, id, roleId } }) => {
    const {
      data: { createInviteCode },
    } = await graphqlService.createInviteCode({
      variables: {
        input: {
          id,
          maxClaims: Number(maxClaims),
          roleId,
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

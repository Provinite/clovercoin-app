import { graphqlService } from "../../graphql/client";
import { makeAction } from "../../utils/loaderUtils";

export const communityMemberListAction = makeAction(
  {
    allowedMethods: ["post"],
    form: {
      roleId: true,
      identityId: true,
    },
  },
  async ({ form: { identityId, roleId } }) => {
    const {
      data: { createCommunityMember },
    } = await graphqlService.createCommunityMember({
      variables: {
        input: {
          identityId,
          roleId,
        },
      },
    });

    return createCommunityMember;
  }
);

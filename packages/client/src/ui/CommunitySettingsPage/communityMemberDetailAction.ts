import { graphqlService } from "../../graphql/client";
import { makeAction } from "../../utils/loaderUtils";

export const communityMemberDetailAction = makeAction(
  {
    slugs: {
      identitySlug: true,
      roleSlug: true,
    },
    allowedMethods: ["DELETE"],
  },
  async ({ ids: { identityId, roleId } }) => {
    const {
      data: { deleteCommunityMember },
    } = await graphqlService.deleteCommunityMember({
      variables: {
        input: {
          identityId,
          roleId,
        },
      },
    });

    return deleteCommunityMember;
  }
);

import { graphqlService } from "../../graphql/client";
import { makeAction } from "../../utils/loaderUtils";

export const communityInvitationListAction = makeAction(
  {
    allowedMethods: ["POST"],
    form: {
      emailAddress: true,
      roleId: true,
    },
  },
  async ({ form: { emailAddress, roleId } }) => {
    const {
      data: { createCommunityInvitation },
    } = await graphqlService.createCommunityInvitation({
      variables: {
        input: {
          emailAddress,
          roleId,
        },
      },
    });
    return createCommunityInvitation;
  }
);

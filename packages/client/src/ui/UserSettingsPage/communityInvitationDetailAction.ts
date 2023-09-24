import { graphqlService } from "../../graphql/client";
import { makeAction } from "../../utils/loaderUtils";

export const communityInvitationDetailAction = makeAction(
  {
    slugs: {
      communityInvitationSlug: true,
    },
    form: {
      accept: true,
    },
    allowedMethods: ["post"],
  },
  async ({ ids: { communityInvitationId }, form: { accept } }) => {
    const {
      data: { answerInvitation },
    } = await graphqlService.answerCommunityInvitation({
      variables: {
        input: {
          accept: accept === "true",
          id: communityInvitationId,
        },
      },
    });

    return answerInvitation;
  }
);

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityInvitation } from "./CommunityInvitation.js";
import { CommunityInvitationAnswerInput } from "./CommunityInvitationAnswerInput.js";
import { CommunityInvitationAnswerResponse } from "./CommunityInvitationAnswerResponse.js";
import { CommunityInvitationCreateInput } from "./CommunityInvitationCreateInput.js";
import { CommunityInvitationCreateResponse } from "./CommunityInvitationCreateResponse.js";

@Resolver(() => CommunityInvitation)
export class CommunityInvitationResolver {
  @Mutation(() => CommunityInvitationCreateResponse)
  @Preauthorize(async ({ args: { input }, context: { roleController } }) => {
    const { roleId } = await parseArgToClass(
      input,
      CommunityInvitationCreateInput
    );
    const role = await roleController.findOneByIdOrFail(roleId);
    return {
      scope: AuthScope.Community,
      permissions: ["canCreateInviteCode"],
      communityId: role.communityId,
    };
  })
  async createCommunityInvitation(
    @Arg("input") input: CommunityInvitationCreateInput,
    @Ctx() { communityInvitationController }: AppGraphqlContext
  ) {
    return communityInvitationController.create({
      inviteeEmail: input.emailAddress,
      roleId: input.roleId,
    });
  }

  @Preauthorize(
    async ({ args: { input }, context: { communityInvitationController } }) => {
      const { id } = await parseArgToClass(
        input,
        CommunityInvitationAnswerInput
      );
      const invite = await communityInvitationController.findOneByIdOrFail(id);
      return {
        scope: AuthScope.Identity,
        identityId: invite.inviteeId,
        permissions: ["canAnswerInvites"],
      };
    }
  )
  @Mutation(() => CommunityInvitationAnswerResponse)
  async answerInvitation(
    @Arg("input") { id, accept }: CommunityInvitationAnswerInput,
    @Ctx()
    { communityInvitationController }: AppGraphqlContext
  ) {
    return communityInvitationController.answerInvitation(id, accept);
  }
}

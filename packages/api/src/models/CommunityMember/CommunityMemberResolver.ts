import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Equal, FindManyOptions } from "typeorm";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { DeleteResponse } from "../../business/DeleteResponse.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { CommunityMember } from "./CommunityMember.js";
import { CommunityMemberCreateInput } from "./CommunityMemberCreateInput.js";
import { CommunityMemberCreateResponse } from "./CommunityMemberCreateResponse.js";
import { CommunityMemberDeleteInput } from "./CommunityMemberDeleteInput.js";
import { CommunityMemberDeleteResponse } from "./CommunityMemberDeleteResponse.js";
import { InvitationRequiredError } from "./InvitationRequiredError.js";

@Resolver(() => CommunityMember)
export class CommunityMemberResolver {
  /**
   * Delete a community member, effectively removing a role from a user
   * @param input
   * @param ctx
   * @returns
   */
  @Preauthorize(
    async ({ context: { communityMemberController }, args: { input } }) => {
      const { id, roleId, identityId } = await parseArgToClass(
        input,
        CommunityMemberDeleteInput
      );
      const findOptions: FindManyOptions<CommunityMember> = {
        relations: { role: true },
      };
      if (id) {
        findOptions.where = {
          id: Equal(id),
        };
      } else if (roleId && identityId) {
        findOptions.where = {
          roleId: Equal(roleId),
          identityId: Equal(identityId),
        };
      } else {
        throw InvalidArgumentError.fromFieldMap({
          id: "ID is required if roleId and identityId are not provided",
        });
      }
      const [member] = await communityMemberController.advancedFind(
        findOptions
      );
      if (!member) {
        throw new NotFoundError();
      }
      return {
        scope: AuthScope.Community,
        communityId: member.role.communityId,
        permissions: ["canCreateInviteCode"],
      };
    }
  )
  @Mutation(() => CommunityMemberDeleteResponse, {
    description:
      "Delete a community member, effectively removing a role from a user",
  })
  async deleteCommunityMember(
    @Arg("input") input: CommunityMemberDeleteInput,
    @Ctx() { communityMemberController }: AppGraphqlContext
  ): Promise<DeleteResponse> {
    if (input.id) {
      const result = await communityMemberController.deleteOneById(input.id);
      if (result.affected) {
        return new DeleteResponse(true);
      }
      throw new NotFoundError();
    } else if (input.identityId && input.roleId) {
      const result = await communityMemberController.delete({
        identityId: Equal(input.identityId),
        roleId: Equal(input.roleId),
      });
      if (result.affected) {
        return new DeleteResponse(true);
      }
      throw new NotFoundError();
    } else {
      throw InvalidArgumentError.fromFieldMap({
        id: "ID is required if roleId and identityId are not provided",
      });
    }
  }

  @Preauthorize(async ({ context: { roleController }, args: { input } }) => {
    const { roleId } = await parseArgToClass(input, CommunityMemberCreateInput);
    const role = await roleController.findOneByIdOrFail(roleId);
    return {
      scope: AuthScope.Community,
      communityId: role.communityId,
      permissions: ["canCreateInviteCode"],
    };
  })
  @Mutation(() => CommunityMemberCreateResponse)
  async createCommunityMember(
    @Arg("input") input: CommunityMemberCreateInput,
    @Ctx()
    {
      communityMemberController,
      identityController,
      roleController,
    }: AppGraphqlContext
  ) {
    const grantee = await identityController.findOneByIdOrFail(
      input.identityId
    );
    const role = await roleController.findOneByIdOrFail(input.roleId);

    const existingMemberships = await communityMemberController.find({
      identityId: grantee.id,
      role: {
        communityId: role.communityId,
      },
    });

    if (!existingMemberships.length) {
      throw new InvitationRequiredError();
    }

    return communityMemberController.create({
      identityId: input.identityId,
      roleId: input.roleId,
    });
  }
}

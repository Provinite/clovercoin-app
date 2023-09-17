import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Role } from "./Role.js";
import { RoleCreateInput } from "./RoleCreateInput.js";
import { RoleCreateResponse } from "./RoleCreateResponse.js";
import { RoleModifyInput } from "./RoleModifyInput.js";
import { RoleModifyResponse } from "./RoleModifyResponse.js";

@Resolver(() => Role)
export class RoleResolver {
  @Mutation(() => RoleModifyResponse)
  @Preauthorize(async ({ context: { roleController }, args: { input } }) => {
    const { id } = await parseArgToClass(input, RoleModifyInput);
    const { communityId } = await roleController.findOneByIdOrFail(id);
    return {
      scope: AuthScope.Community,
      communityId,
      permissions: ["canEditRole"],
    };
  })
  async modifyRole(
    @Arg("input") input: RoleModifyInput,
    @Ctx() { roleController }: AppGraphqlContext
  ): Promise<Role> {
    return roleController.updateOneById(input.id, {
      ...input,
      name: input.name ?? undefined,
    });
  }

  @Mutation(() => RoleCreateResponse)
  @Preauthorize(async ({ args: { input } }) => {
    const { communityId } = await parseArgToClass(input, RoleCreateInput);
    return {
      scope: AuthScope.Community,
      communityId,
      permissions: ["canCreateRole"],
    };
  })
  async createRole(
    @Arg("input") input: RoleCreateInput,
    @Ctx() { roleController }: AppGraphqlContext
  ): Promise<Role> {
    return roleController.create({
      ...input,
    });
  }
}

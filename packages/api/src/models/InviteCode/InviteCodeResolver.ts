import { IsOptional, IsUUID, Max, Min, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { IsNull } from "typeorm";
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { hasGlobalPerms } from "../../business/auth/authorizationInfoGenerators/hasGlobalPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { anyAuth, Preauthorize } from "../../business/auth/Preauthorize.js";
import { IsValidInviteCode } from "../../business/validation/IsValidInviteCode.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { InviteCode } from "./InviteCode.js";

export const InviteCodeResponse = createUnionType({
  name: "InviteCodeResponse",
  types: () => [InviteCodeList, NotAuthenticatedError, NotAuthorizedError],
});

export const InviteCodeCreateResponse = createUnionType({
  name: "InviteCodeCreateResponse",
  types: () => [
    InviteCode,
    InvalidArgumentError,
    DuplicateError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

@ObjectType()
export class InviteCodeList {
  constructor(inviteCodes: InviteCode[]) {
    this.list = inviteCodes;
  }

  @Field(() => [InviteCode], { nullable: false })
  public list: InviteCode[];
}

@InputType()
export class InviteCodeCreateInput {
  @Field(() => ID, { nullable: false })
  @MinLength(1)
  @IsValidInviteCode()
  id!: string;

  @Field(() => Int, { nullable: false })
  @Min(1)
  @Max(100)
  maxClaims!: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID(4)
  roleId: string | null = null;
}

@InputType()
export class InviteCodeFilters {
  @Field(() => ID, { nullable: true, defaultValue: null })
  @IsUUID(4)
  @IsOptional()
  communityId: string | null = null;
}

@Resolver()
export class InviteCodeResolver {
  @Preauthorize(
    anyAuth(
      /**
       * Global `canListInviteCodes` permission allows viewing any invite codes.
       */
      hasGlobalPerms(["canListInviteCodes"]),
      /**
       * Community-specific `canListInviteCodes` perms may be used iff there is
       * a community filter provided.
       */
      async ({ args: { filters } }) => {
        const input = await parseArgToClass(filters, InviteCodeFilters);
        if (!input.communityId) {
          return null;
        }
        return {
          scope: AuthScope.Community,
          communityId: input.communityId,
          permissions: ["canListInviteCodes"],
        };
      }
    )
  )
  @Query(() => InviteCodeResponse, {
    description: "Fetch invite codes",
  })
  async inviteCodes(
    @Ctx() { inviteCodeController }: AppGraphqlContext,
    @Arg("filters") filters: InviteCodeFilters
  ): Promise<InviteCodeList> {
    return new InviteCodeList(
      await inviteCodeController.find(
        filters.communityId
          ? {
              role: {
                communityId: filters.communityId,
              },
            }
          : {
              roleId: IsNull(),
            }
      )
    );
  }

  @Preauthorize(
    anyAuth(
      /**
       * Global `canCreateInviteCode` permission allows creation
       * in any community for any role.
       */
      hasGlobalPerms(["canCreateInviteCode"]),
      /**
       * Community role `canCreateInviteCode` permission allows
       * creation for any role in the community.
       */
      async ({ context: { roleController }, args: { input } }) => {
        const { roleId } = await parseArgToClass(input, InviteCodeCreateInput);
        if (!roleId) {
          return null;
        }
        const role = await roleController.findOneByIdOrFail(roleId);
        return {
          scope: AuthScope.Community,
          communityId: role.communityId,
          permissions: ["canCreateInviteCode"],
        };
      }
    )
  )
  @Mutation(() => InviteCodeCreateResponse)
  async createInviteCode(
    @Ctx()
    {
      inviteCodeController,
      principal,
      communityController,
      roleController,
    }: AppGraphqlContext,
    @Arg("input", { nullable: false }) input: InviteCodeCreateInput
  ): Promise<InviteCode> {
    // PERF: How can we avoid redoing this fetch that's (maybe) already
    // being done by the auth code
    const createBody = { ...input, creatorId: principal!.id };
    if (createBody.roleId) {
      const role = await roleController.findOneByIdOrFail(createBody.roleId);
      const community = await communityController.findOneByIdOrFail(
        role.communityId
      );
      createBody.id =
        community.name.replaceAll(/[^a-zA-Z0-9]/g, "") + ":" + createBody.id;
    }
    return inviteCodeController.create(createBody);
  }
}

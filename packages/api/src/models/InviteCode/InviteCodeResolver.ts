import { IsUUID, Max, Min, MinLength } from "class-validator";
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
import { hasGlobalPerms } from "../../business/auth/authorizationInfoGenerators/hasGlobalPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { IsValidInviteCode } from "../../business/validation/IsValidInviteCode.js";
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

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  public creatorId!: string;
}

@Resolver()
export class InviteCodeResolver {
  @Preauthorize(hasGlobalPerms(["canListInviteCodes"]))
  @Query(() => InviteCodeResponse, {
    description: "Fetch invite codes",
  })
  async inviteCodes(
    @Ctx() { inviteCodeController }: AppGraphqlContext
  ): Promise<InviteCodeList> {
    return new InviteCodeList(await inviteCodeController.find());
  }

  @Preauthorize(hasGlobalPerms(["canCreateInviteCode"]))
  @Mutation(() => InviteCodeCreateResponse)
  async createInviteCode(
    @Ctx() { inviteCodeController }: AppGraphqlContext,
    @Arg("input", { nullable: false }) input: InviteCodeCreateInput
  ): Promise<InviteCode> {
    return inviteCodeController.create(input);
  }
}

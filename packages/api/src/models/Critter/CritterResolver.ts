import { IsArray, IsOptional, IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Critter } from "./Critter.js";

@InputType()
export class CritterCreateInput {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  ownerId: string | null = null;

  @Field({ nullable: false })
  @MinLength(1)
  name!: string;

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  speciesId!: string;

  @Field(() => [CritterCreateTraitInput], { nullable: false })
  @IsArray()
  traitValues!: CritterCreateTraitInput[];

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  traitListId!: string;
}

@InputType()
export class CritterCreateTraitInput {
  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  traitId!: string;

  @Field({ nullable: false })
  value!: string;
}

/**
 * CreateCommunity mutation response type with all
 * known errors.
 */
const CreateCritterResponse = createUnionType({
  name: "CreateCritterResponse",
  types: () => [Critter, DuplicateError, InvalidArgumentError],
});

@Resolver(() => Critter)
export class CritterResolver {
  @Mutation(() => CreateCritterResponse)
  async createCritter(
    @Arg("input") input: CritterCreateInput,
    @Ctx() { critterController }: AppGraphqlContext
  ): Promise<Critter> {
    if (!input.ownerId) {
      throw new Error("OwnerId Optional: NOT IMPLEMENTED");
    }
    // TODO: Look up owner from auth token
    // only allow creation under other owners by admins
    return critterController.create({
      ...input,
      ownerId: input.ownerId,
    });
  }

  @Query(() => [Critter])
  async critters(
    @Ctx() { critterRepository }: AppGraphqlContext
  ): Promise<Critter[]> {
    return await critterRepository.find();
  }
}

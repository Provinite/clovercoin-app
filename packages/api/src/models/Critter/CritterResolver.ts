import { IsArray, IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
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
  @Field({ nullable: false })
  @MinLength(1)
  name!: string;

  @Field({ nullable: false })
  @IsUUID(4)
  speciesId!: string;

  @Field(() => [CritterCreateTraitInput], { nullable: false })
  @IsArray()
  traitValues!: CritterCreateTraitInput[];

  @Field({ nullable: false })
  @IsUUID(4)
  traitListId!: string;

  ownerId!: string;
}

@InputType()
export class CritterCreateTraitInput {
  @Field({ nullable: false })
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
    input.ownerId = "97a43d75-5bc3-4bdc-9dd5-70bacd51c36f";
    return critterController.create(input);
  }

  @Query(() => [Critter])
  async critters(
    @Ctx() { critterRepository }: AppGraphqlContext
  ): Promise<Critter[]> {
    return await critterRepository.find();
  }
}

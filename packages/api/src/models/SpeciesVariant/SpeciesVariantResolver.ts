import { IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { SpeciesVariant } from "./SpeciesVariant.js";

@InputType()
export class SpeciesVariantCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  speciesId!: string;

  @Field(() => String)
  @MinLength(1)
  name!: string;
}

@InputType()
export class SpeciesVariantModifyInput {
  @Field(() => ID)
  @IsUUID(4)
  traitListId!: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  name: string | null = null;
}

const SpeciesVariantCreateResponse = createUnionType({
  name: "SpeciesVariantCreateResponse",
  types: () => [SpeciesVariant, DuplicateError, InvalidArgumentError],
});

@Resolver(() => SpeciesVariant)
export class SpeciesVariantResolver {
  @Mutation(() => SpeciesVariantCreateResponse)
  async createTraitList(
    @Arg("input") input: SpeciesVariantCreateInput,
    @Ctx() { speciesVariantController }: AppGraphqlContext
  ): Promise<SpeciesVariant> {
    return await speciesVariantController.create(input);
  }
}
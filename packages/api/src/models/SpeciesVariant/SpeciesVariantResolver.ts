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
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
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

const SpeciesVariantCreateResponse = createUnionType({
  name: "SpeciesVariantCreateResponse",
  types: () => [
    SpeciesVariant,
    DuplicateError,
    InvalidArgumentError,
    NotFoundError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

@Resolver(() => SpeciesVariant)
export class SpeciesVariantResolver {
  @Mutation(() => SpeciesVariantCreateResponse)
  @Preauthorize(async ({ args: { input }, context: { speciesController } }) => {
    const { speciesId } = await parseArgToClass(
      input,
      SpeciesVariantCreateInput
    );
    const species = await speciesController.findOneByIdOrFail(speciesId);
    return {
      scope: AuthScope.Community,
      communityId: species.communityId,
      permissions: ["canEditSpecies"],
    };
  })
  async createSpeciesVariant(
    @Arg("input") input: SpeciesVariantCreateInput,
    @Ctx() { speciesVariantController }: AppGraphqlContext
  ): Promise<SpeciesVariant> {
    return await speciesVariantController.create(input);
  }
}

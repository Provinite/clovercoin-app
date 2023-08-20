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
import { Variant } from "./TraitList.js";

@InputType()
export class TraitListCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  speciesId!: string;

  @Field(() => String)
  @MinLength(1)
  name!: string;
}

@InputType()
export class TraitListModifyInput {
  @Field(() => ID)
  @IsUUID(4)
  traitListId!: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: null,
  })
  name: string | null = null;
}

const TraitListCreateResponse = createUnionType({
  name: "TraitListCreateResponse",
  types: () => [Variant, DuplicateError, InvalidArgumentError],
});

@Resolver(() => Variant)
export class TraitListResolver {
  @Mutation(() => TraitListCreateResponse)
  async createTraitList(
    @Arg("input") input: TraitListCreateInput,
    @Ctx() { traitListController }: AppGraphqlContext
  ): Promise<Variant> {
    return await traitListController.create(input);
  }
}

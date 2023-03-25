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
import { DuplicateError } from "../../errors/DuplicateError";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitList } from "./TraitList";

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
  types: () => [TraitList, DuplicateError, InvalidArgumentError],
});

@Resolver(() => TraitList)
export class TraitListResolver {
  @Mutation(() => TraitListCreateResponse)
  async createTraitList(
    @Arg("input") input: TraitListCreateInput,
    @Ctx() { traitListController }: AppGraphqlContext
  ): Promise<TraitList> {
    return await traitListController.create(input);
  }
}

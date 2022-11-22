import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitListEntry } from "./TraitListEntry";

@InputType()
export class TraitListEntryCreateInput {
  @Field(() => ID)
  traitListId!: string;

  @Field(() => ID)
  traitId!: string;

  @Field(() => Int)
  order!: number;

  @Field(() => Boolean, { defaultValue: false })
  required: boolean = false;
}

@Resolver(() => TraitListEntry)
export class TraitListEntryResolver {
  @Mutation(() => TraitListEntry)
  async createTraitListEntry(
    @Arg("input") input: TraitListEntryCreateInput,
    @Ctx() { traitListEntryController }: AppGraphqlContext
  ) {
    return await traitListEntryController.create(input);
  }
}

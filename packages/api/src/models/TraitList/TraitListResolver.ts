import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { TraitList } from "./TraitList";

@InputType()
export class TraitListCreateInput {
  @Field(() => ID)
  speciesId!: string;

  @Field(() => String)
  name!: string;
}

@Resolver(() => TraitList)
export class TraitListResolver {
  @Mutation(() => TraitList)
  async createTraitList(
    @Arg("input") input: TraitListCreateInput,
    @Ctx() { traitListController }: AppGraphqlContext
  ) {
    return await traitListController.create(input);
  }
}

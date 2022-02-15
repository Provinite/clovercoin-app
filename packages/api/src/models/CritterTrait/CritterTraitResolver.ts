import { GraphQLInt } from "graphql";
import {
  Arg,
  Ctx,
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { CritterTrait } from "./CritterTrait";
import { CritterTraitUnionType } from "./CritterTraitUnionType";

@InputType()
export class CritterTraitCreateInput {
  @Field(() => ID)
  critterId!: string;

  @Field(() => ID)
  traitId!: string;

  @Field(() => String, { defaultValue: null, nullable: true })
  valueString: string | null = null;

  @Field(() => GraphQLInt, { defaultValue: null, nullable: true })
  valueInt: number | null = null;

  @Field(() => GraphQLISODateTime, { defaultValue: null, nullable: true })
  valueDate: Date | null = null;

  @Field(() => Boolean, { defaultValue: null, nullable: true })
  valueBool: boolean | null = null;
}

@Resolver(() => CritterTrait)
export class CritterTraitResolver {
  @Mutation(() => CritterTraitUnionType)
  async createCritterTrait(
    @Arg("input") body: CritterTraitCreateInput,
    @Ctx() { critterTraitRepository }: AppGraphqlContext
  ): Promise<CritterTrait> {
    const result = await critterTraitRepository.insert(body);
    return await critterTraitRepository.findOneOrFail(result.identifiers[0].id);
  }
}

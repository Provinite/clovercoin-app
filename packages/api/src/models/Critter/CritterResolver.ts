import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Critter } from "./Critter.js";

@InputType()
export class CritterCreateInput {
  @Field({ nullable: false })
  name!: string;
  @Field({ nullable: false })
  speciesId!: string;
}

@Resolver(() => Critter)
export class CritterResolver {
  @Mutation(() => Critter)
  async createCritter(
    @Arg("input") input: CritterCreateInput,
    @Ctx() { critterRepository }: AppGraphqlContext
  ): Promise<Critter> {
    console.log(input);
    const result = await critterRepository.insert({
      name: input.name,
      speciesId: input.speciesId,
    });
    return await critterRepository.findOneOrFail(result.identifiers[0].id);
  }

  @Query(() => [Critter])
  async critters(
    @Ctx() { critterRepository }: AppGraphqlContext
  ): Promise<Critter[]> {
    return await critterRepository.find();
  }
}

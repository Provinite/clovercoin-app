import {
  IsArray,
  IsOptional,
  IsUUID,
  MinLength,
  ValidateIf,
} from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
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

@InputType()
export class CritterFilters {
  @Field(() => ID, { nullable: true })
  @IsUUID(4)
  @IsOptional()
  speciesId: string | null = null;

  @Field(() => ID, { nullable: true })
  @ValidateIf((filters) => !filters.id)
  @IsUUID(4)
  id: string | null = null;
}

@ObjectType()
export class CritterList {
  constructor(critters: Critter[]) {
    this.list = critters;
  }

  @Field(() => [Critter])
  list: Critter[];
}

@InputType()
export class CritterModifyInput {
  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  id!: string;

  @Field(() => String, { nullable: true })
  @MinLength(2)
  @IsOptional()
  name?: string;

  @Field(() => [CritterCreateTraitInput], { nullable: true })
  @IsArray()
  @IsOptional()
  traitValues?: CritterCreateTraitInput[];

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  traitListId?: string;
}

const CritterListResponse = createUnionType({
  name: "CritterListResponse",
  types: () => [CritterList, InvalidArgumentError],
});

const CritterModifyResponse = createUnionType({
  name: "CritterModifyResponse",
  types: () => [Critter, InvalidArgumentError, NotFoundError],
});

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

  @Query(() => CritterListResponse)
  async critters(
    @Arg("filters") filters: CritterFilters,
    @Ctx() { critterRepository }: AppGraphqlContext
  ): Promise<CritterList> {
    const result = await critterRepository.find({
      where: {
        speciesId: filters.speciesId ?? undefined,
        id: filters.id ?? undefined,
      },
      order: {
        name: "DESC",
      },
    });

    return new CritterList(result);
  }

  // TODO: Permissions, need to limit owners to editing their own
  @Mutation(() => CritterModifyResponse)
  async modifyCritter(
    @Arg("input") input: CritterModifyInput,
    @Ctx() { critterController }: AppGraphqlContext
  ) {
    return critterController.updateOneById(input.id, input);
  }
}

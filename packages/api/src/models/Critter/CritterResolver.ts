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
import { AuthScope } from "../../business/auth/AuthInfo.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { anyAuth, Preauthorize } from "../../business/auth/Preauthorize.js";
import { parseArgToClass } from "../../business/validation/parseArgToClass.js";
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
  variantId!: string;
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
  variantId?: string;
}

const CritterListResponse = createUnionType({
  name: "CritterListResponse",
  types: () => [CritterList, InvalidArgumentError, NotAuthenticatedError],
});

const CritterModifyResponse = createUnionType({
  name: "CritterModifyResponse",
  types: () => [
    Critter,
    InvalidArgumentError,
    NotFoundError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

const CreateCritterResponse = createUnionType({
  name: "CreateCritterResponse",
  types: () => [
    Critter,
    DuplicateError,
    InvalidArgumentError,
    NotAuthenticatedError,
    NotAuthorizedError,
  ],
});

@Resolver(() => Critter)
export class CritterResolver {
  @Mutation(() => CreateCritterResponse)
  @Preauthorize(async ({ context: { speciesController }, args: { input } }) => {
    const { speciesId } = await parseArgToClass(input, CritterCreateInput);
    const species = await speciesController.findOneByIdOrFail(speciesId);
    return {
      scope: AuthScope.Community,
      communityId: species.communityId,
      permissions: ["canCreateCritter"],
    };
  })
  async createCritter(
    @Arg("input") input: CritterCreateInput,
    @Ctx() { critterController, principal }: AppGraphqlContext
  ): Promise<Critter> {
    return critterController.create({
      ...input,
      ownerId: principal!.id,
    });
  }

  @Preauthorize()
  @Query(() => CritterListResponse)
  async critters(
    @Arg("filters") filters: CritterFilters,
    @Ctx() { critterController }: AppGraphqlContext
  ): Promise<CritterList> {
    const result = await critterController.find({
      speciesId: filters.speciesId ?? undefined,
      id: filters.id ?? undefined,
    });

    return new CritterList(result);
  }

  @Preauthorize(
    async ({
      context: { critterController, speciesController },
      args: { input: rawInput },
    }) => {
      const input = await parseArgToClass(rawInput, CritterModifyInput);
      const critter = await critterController.findOneById(input.id);
      if (!critter) {
        throw new NotFoundError();
      }

      const species = await speciesController.findOneById(critter.speciesId);
      if (!species) {
        throw new NotFoundError();
      }

      return anyAuth(
        {
          scope: AuthScope.Community,
          communityId: species.communityId,
          permissions: ["canEditCritter"],
        },
        {
          scope: AuthScope.Critter,
          critterId: critter.id,
          permissions: ["canEditOwn"],
        }
      );
    }
  )
  @Mutation(() => CritterModifyResponse)
  async modifyCritter(
    @Arg("input") input: CritterModifyInput,
    @Ctx() { critterController }: AppGraphqlContext
  ) {
    return critterController.updateOneById(input.id, input);
  }
}

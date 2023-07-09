import { IsOptional, IsUUID, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { FindManyOptions, ILike } from "typeorm/index.js";
import { DuplicateError } from "../../errors/DuplicateError.js";
import { InvalidArgumentError } from "../../errors/InvalidArgumentError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { ImageContentType } from "../ImageContentType.js";
import { Species } from "./Species.js";

@InputType()
export class SpeciesCreateInput {
  @Field()
  @MinLength(1)
  name!: string;

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  communityId!: string;
}

@InputType()
export class SpeciesModifyInput {
  @Field()
  @IsUUID(4)
  id!: string;
}

@InputType()
export class SpeciesImageUrlCreateInput {
  @Field(() => ID)
  @IsUUID(4)
  speciesId!: string;

  @Field(() => ImageContentType)
  contentType!: ImageContentType;
}

@InputType()
export class SpeciesFilters {
  @Field(() => String, { nullable: true, defaultValue: null })
  @IsOptional()
  @MinLength(1)
  name: string | null = null;

  @Field(() => ID, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsUUID(4)
  id: string | null = null;

  @Field(() => ID, { nullable: false })
  @IsUUID(4)
  communityId!: string;
}

const SpeciesCreateResponse = createUnionType({
  name: "SpeciesCreateResponse",
  types: () => [Species, InvalidArgumentError, DuplicateError],
});

@ObjectType()
class SpeciesList {
  constructor(list: Species[] = []) {
    this.list = list;
  }
  @Field(() => [Species])
  list!: Species[];
}

@ObjectType()
class UrlResponse {
  @Field(() => String)
  url: string;
  constructor(url: string) {
    this.url = url;
  }
}

const SpeciesResponse = createUnionType({
  name: "SpeciesResponse",
  types: () => [SpeciesList, InvalidArgumentError],
});

@Resolver(() => Species)
export class SpeciesResolver {
  @Query(() => SpeciesResponse)
  async species(
    @Arg("filters", () => SpeciesFilters, { nullable: true })
    speciesFilters: SpeciesFilters | null = null,
    @Ctx() { speciesRepository }: AppGraphqlContext
  ): Promise<SpeciesList> {
    const filters: FindManyOptions<Species> = {};

    if (speciesFilters) {
      const { id, name, communityId } = speciesFilters;
      filters.where = {};
      if (id) {
        filters.where.id = id;
      }
      if (name) {
        filters.where.name = ILike(`%${name}%`);
      }
      filters.where.communityId = communityId;
    }
    return new SpeciesList(await speciesRepository.find(filters));
  }

  @FieldResolver(() => String, {
    description: "Icon URL for this species",
    nullable: true,
  })
  async iconUrl(
    @Root() species: Species,
    @Ctx() { presignedUrlService }: AppGraphqlContext
  ): Promise<string | null> {
    if (species.hasImage) {
      return presignedUrlService.getPresignedUrl({
        object: {
          Bucket: "images",
          Key: `species-${species.id}`,
        },
      });
    }
    return null;
  }

  @Mutation(() => SpeciesCreateResponse)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<Species> {
    return await speciesController.create({
      ...input,
    });
  }

  @Mutation(() => UrlResponse)
  async createSpeciesImageUploadUrl(
    @Arg("input") input: SpeciesImageUrlCreateInput,
    @Ctx() { transactionProvider }: AppGraphqlContext
  ): Promise<UrlResponse> {
    return transactionProvider.runTransaction(
      async ({ presignedUrlService, speciesController }) => {
        const species = await speciesController.findOneById(input.speciesId);
        if (!species) {
          throw new NotFoundError();
        }
        if (!species.hasImage) {
          await speciesController.updateOneById(species.id, { hasImage: true });
        }
        await speciesController.updateOneById(input.speciesId, {
          hasImage: true,
        });
        return new UrlResponse(
          await presignedUrlService.putPresignedUrl({
            object: {
              Bucket: "images",
              Key: `species-${input.speciesId}`,
            },
          })
        );
      }
    );
  }
}

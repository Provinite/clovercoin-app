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
import { FindOptionsWhere, ILike } from "typeorm";
import { Authenticated } from "../../business/auth/Authenticated.js";
import { hasCommunityPerms } from "../../business/auth/authorizationInfoGenerators/hasCommunityPerms.js";
import { NotAuthenticatedError } from "../../business/auth/NotAuthenticatedError.js";
import { NotAuthorizedError } from "../../business/auth/NotAuthorizedError.js";
import { Preauthorize } from "../../business/auth/Preauthorize.js";
import { ImageTarget } from "../../business/ImageController.js";
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
  types: () => [
    Species,
    InvalidArgumentError,
    DuplicateError,
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
  ],
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

export const CreateSpeciesImageUploadUrlResponse = createUnionType({
  name: "CreateSpeciesImageUploadUrlResponse",
  types: () => [
    UrlResponse,
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
  ],
});

const SpeciesResponse = createUnionType({
  name: "SpeciesResponse",
  types: () => [SpeciesList, InvalidArgumentError, NotAuthenticatedError],
});

@Resolver(() => Species)
export class SpeciesResolver {
  @Authenticated()
  @Query(() => SpeciesResponse)
  async species(
    @Arg("filters", () => SpeciesFilters, { nullable: true })
    speciesFilters: SpeciesFilters | null = null,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<SpeciesList> {
    const filters: FindOptionsWhere<Species> = {};

    if (speciesFilters) {
      const { id, name, communityId } = speciesFilters;
      if (id) {
        filters.id = id;
      }
      if (name) {
        filters.name = ILike(`%${name}%`);
      }
      filters.communityId = communityId;
    }
    const result = new SpeciesList(await speciesController.find(filters));
    return result;
  }

  @FieldResolver(() => String, {
    description: "Icon URL for this species",
    nullable: true,
  })
  async iconUrl(
    @Root() species: Species,
    @Ctx() { imageController }: AppGraphqlContext
  ): Promise<string | null> {
    if (species.hasImage) {
      return imageController.getGetUrl(ImageTarget.Species, species.id);
    }
    return null;
  }

  @Preauthorize(hasCommunityPerms(["canCreateSpecies"]))
  @Mutation(() => SpeciesCreateResponse)
  async createSpecies(
    @Arg("input") input: SpeciesCreateInput,
    @Ctx() { speciesController }: AppGraphqlContext
  ): Promise<Species> {
    return await speciesController.create({
      ...input,
    });
  }

  @Preauthorize(hasCommunityPerms(["canEditSpecies"]))
  @Mutation(() => CreateSpeciesImageUploadUrlResponse)
  async createSpeciesImageUploadUrl(
    @Arg("input") input: SpeciesImageUrlCreateInput,
    @Ctx() { transactionProvider }: AppGraphqlContext
  ): Promise<UrlResponse> {
    return transactionProvider.runTransaction(
      async ({ speciesController, imageController }) => {
        const species = await speciesController.findOneById(input.speciesId);
        if (!species) {
          throw new NotFoundError();
        }
        await speciesController.updateOneById(input.speciesId, {
          hasImage: true,
        });
        return new UrlResponse(
          await imageController.getPutUrl(ImageTarget.Species, input.speciesId)
        );
      }
    );
  }
}

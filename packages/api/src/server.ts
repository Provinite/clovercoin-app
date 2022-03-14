import "reflect-metadata";
import Koa, { Context, Request, Response } from "koa";
import mount from "koa-mount";
import { graphqlHTTP, OptionsResult } from "koa-graphql";
import { buildSchema } from "type-graphql";
import { Critter } from "./models/Critter/Critter";
import { Species } from "./models/Species/Species";
import { createDbConnection } from "./db/dbConnection";
import { GraphQLParams } from "express-graphql";
import { v4 } from "uuid";
import { Trait } from "./models/Trait/Trait";
import { SpeciesTrait } from "./models/SpeciesTrait/SpeciesTrait";
import { CritterResolver } from "./models/Critter/CritterResolver";
import { SpeciesResolver } from "./models/Species/SpeciesResolver";
import { CritterTrait } from "./models/CritterTrait/CritterTrait";
import { CritterTraitResolver } from "./models/CritterTrait/CritterTraitResolver";
import { TraitResolver } from "./models/Trait/TraitResolver";
import { SpeciesTraitResolver } from "./models/SpeciesTrait/SpeciesTraitResolver";
import cors from "@koa/cors";

(async function () {
  const db = await createDbConnection();

  const critterRepository = db.getRepository(Critter);
  const speciesRepository = db.getRepository(Species);
  const traitRepository = db.getRepository(Trait);
  const speciesTraitRepository = db.getRepository(SpeciesTrait);
  const critterTraitRepository = db.getRepository(CritterTrait);

  const koa = new Koa();

  const schema = await buildSchema({
    resolvers: [
      CritterResolver,
      SpeciesResolver,
      CritterTraitResolver,
      TraitResolver,
      SpeciesTraitResolver,
    ],
    emitSchemaFile: "./schema.gql",
  });

  koa.use(cors()).use(
    mount(
      "/",
      graphqlHTTP(
        (
          _request: Request,
          _response: Response,
          _ctx: Context,
          _params?: GraphQLParams
        ): OptionsResult => ({
          schema,
          graphiql: true,
          context: {
            db,
            critterRepository,
            speciesRepository,
            traitRepository,
            speciesTraitRepository,
            critterTraitRepository,
            _tgdContext: {
              requestId: v4(),
              typeormGetConnection: () => db,
            },
          },
        })
      )
    )
  );

  koa.listen(3000);
})();

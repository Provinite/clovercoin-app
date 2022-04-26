import { Repository } from "typeorm";
import { EntityController } from "../../business/EntityController";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext";
import { Critter } from "./Critter";

export class CritterController extends EntityController<
  Critter,
  Repository<Critter>,
  any
> {
  constructor({ critterRepository }: AppGraphqlContext) {
    super(critterRepository);
  }
}

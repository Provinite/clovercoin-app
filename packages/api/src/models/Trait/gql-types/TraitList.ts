import { Field, ObjectType } from "type-graphql";
import { Trait } from "../Trait.js";

@ObjectType()
export class TraitList {
  constructor(list: Trait[]) {
    this.list = list;
  }

  @Field(() => [Trait], { nullable: false })
  list: Trait[];
}

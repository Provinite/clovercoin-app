import { Field, ObjectType } from "type-graphql";
import { Identity } from "./Identity.js";

@ObjectType()
export class IdentityList {
  constructor(list: Identity[]) {
    this.list = list;
  }
  @Field(() => [Identity])
  list: Identity[];
}

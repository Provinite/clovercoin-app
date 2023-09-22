import { Field, ObjectType } from "type-graphql";
import { Role } from "./Role.js";

@ObjectType()
export class RoleList {
  constructor(list: Role[]) {
    this.list = list;
  }
  @Field(() => [Role])
  list: Role[];
}

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DeleteResponse {
  @Field()
  ok: boolean;

  constructor(ok: boolean) {
    this.ok = ok;
  }
}

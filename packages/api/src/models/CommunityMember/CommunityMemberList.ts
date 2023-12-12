import { Field, ObjectType } from "type-graphql";
import { CommunityMember } from "./CommunityMember.js";

@ObjectType()
export class CommunityMemberList {
  constructor(list: CommunityMember[]) {
    this.list = list;
  }
  @Field(() => [CommunityMember])
  list: CommunityMember[];
}

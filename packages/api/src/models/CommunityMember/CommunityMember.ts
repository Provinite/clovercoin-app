import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Identity } from "../Identity/Identity";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";

@Entity()
@ObjectType()
export class CommunityMember {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    default: "member",
  })
  role: string = "member";

  @ManyToOneField({
    type: () => Identity,
    nullable: false,
    columnName: "identityId",
    foreignColumnName: "id",
  })
  identity!: Identity;

  @RelationIdField<CommunityMember>({
    relation: (cm) => cm.identity,
    nullable: false,
  })
  identityId: string = "";
}

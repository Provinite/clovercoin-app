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
export class Account {
  @IdField
  id!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @ManyToOneField({
    columnName: "identityId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Identity,
  })
  identity!: Identity;

  @RelationIdField<Account>({
    nullable: false,
    relation: (account) => account.identity,
  })
  identityId!: string;
}

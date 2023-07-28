import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";

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

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  identityId!: string;
}

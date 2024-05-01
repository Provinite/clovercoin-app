import { IsEmpty, IsString, IsUUID, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
export class Account {
  @IdField
  @IsUUID(4, { groups: [ValidationGroup.Update] })
  @IsEmpty({ groups: [ValidationGroup.Insert] })
  id!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  @IsString({ groups: [...ValidationGroupAll] })
  @MinLength(1, { groups: [...ValidationGroupAll] })
  username!: string;

  @Column({
    nullable: false,
  })
  @IsString({ groups: [...ValidationGroupAll] })
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
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  identityId!: string;
}

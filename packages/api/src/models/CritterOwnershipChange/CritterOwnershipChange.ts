import { IsEmpty, IsUUID } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";
import { ValidationGroup, ValidationGroupAll } from "../ValidationGroup.js";

@Entity()
@ObjectType()
export class CritterOwnershipChange {
  @IdField
  @IsEmpty({
    groups: [ValidationGroup.Insert],
  })
  @IsUUID(4, {
    groups: [ValidationGroup.Update],
  })
  id!: string;

  @ManyToOneField({
    columnName: "fromIdentityId",
    foreignColumnName: "id",
    nullable: true,
    type: () => Identity,
  })
  fromIdentity?: Identity;

  @Column("uuid", { nullable: true })
  @Field(() => ID)
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  fromIdentityId?: string;

  @ManyToOneField({
    columnName: "toIdentityId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Identity,
  })
  toIdentity!: Identity;

  @Column("uuid", { nullable: false })
  @Field(() => ID)
  @IsUUID(4, { groups: [...ValidationGroupAll] })
  toIdentityId?: string;
}

import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm/index.js";
import { Identity } from "../Identity/Identity.js";
import { IdField, ManyToOneField } from "../relationFieldDecorators.js";

@Entity()
@ObjectType()
export class CritterOwnershipChange {
  @IdField
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
  toIdentityId?: string;
}

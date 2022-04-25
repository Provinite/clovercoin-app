import { ObjectType } from "type-graphql";
import { Entity } from "typeorm";
import { Identity } from "../Identity/Identity";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators";

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

  @RelationIdField<CritterOwnershipChange>({
    nullable: true,
    relation: (change) => change.fromIdentity,
  })
  fromIdentityId?: string;

  @ManyToOneField({
    columnName: "toIdentityId",
    foreignColumnName: "id",
    nullable: false,
    type: () => Identity,
  })
  toIdentity!: Identity;

  @RelationIdField<CritterOwnershipChange>({
    nullable: false,
    relation: (change) => change.toIdentity,
  })
  toIdentityId?: string;
}

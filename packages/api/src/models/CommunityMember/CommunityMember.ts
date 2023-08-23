import { ObjectType } from "type-graphql";
import type { Relation } from "typeorm";
import { Entity } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { Role } from "../Role/Role.js";

@Entity()
@ObjectType()
export class CommunityMember {
  @IdField
  id!: string;

  @ManyToOneField<Role>({
    type: () => Role,
    foreignColumnName: "id",
    columnName: "roleId",
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_COMMUNITY_MEMBER_ROLE_ID_ROLE_ID",
    },
    nullable: false,
    inverseSide: (role) => role.communityMembers,
  })
  role!: Relation<Role>;

  @RelationIdField<CommunityMember>({
    relation: (cm) => cm.role,
    nullable: false,
  })
  roleId!: string;

  @ManyToOneField<Identity>({
    type: () => Identity,
    inverseSide: (identity) => identity.communityMemberships,
    nullable: false,
    columnName: "identityId",
    foreignColumnName: "id",
    joinColumnOptions: {
      foreignKeyConstraintName:
        "FK_COMMUNITY_MEMBER_ROLE_IDENTITY_ID_IDENTITY_ID",
    },
  })
  identity!: Relation<Identity>;

  @RelationIdField<CommunityMember>({
    relation: (cm) => cm.identity,
    nullable: false,
  })
  identityId!: string;
}

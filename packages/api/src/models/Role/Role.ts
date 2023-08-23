import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import type { Relation } from "typeorm";
import { Community } from "../Community/Community.js";
import {
  IdField,
  ManyToOneField,
  RelationIdField,
} from "../relationFieldDecorators.js";
import { CommunityMember } from "../CommunityMember/CommunityMember.js";

@Entity()
@ObjectType()
@Unique("UQ_ROLE_COMMUNITY_NAME", ["name", "communityId"])
export class Role {
  @IdField
  id!: string;

  @Column("text")
  @Field(() => String)
  name!: string;

  @RelationIdField<Role>({
    nullable: false,
    relation: (role) => role.community,
  })
  communityId!: string;

  @ManyToOneField<Community>({
    type: () => Community,
    columnName: "communityId",
    nullable: false,
    foreignColumnName: "id",
    inverseSide: (community) => community.roles,
    joinColumnOptions: {
      foreignKeyConstraintName: "FK_ROLE_COMMUNITY_ID_COMMUNITY_ID",
    },
  })
  community!: Relation<Community>;

  @OneToMany(() => CommunityMember, (communityMember) => communityMember.role)
  communityMembers!: CommunityMember[];

  @Column("boolean", { nullable: false, default: false })
  @Field(() => Boolean)
  canCreateSpecies!: boolean;
}

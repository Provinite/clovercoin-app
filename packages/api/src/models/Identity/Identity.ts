import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { CommunityInvitation } from "../CommunityInvitation/CommunityInvitation.js";
import { CommunityMember } from "../CommunityMember/CommunityMember.js";
import { InviteCode } from "../InviteCode/InviteCode.js";
import { IdField } from "../relationFieldDecorators.js";

@ObjectType()
@Entity()
export class Identity {
  @IdField
  id!: string;

  @Column({
    nullable: false,
  })
  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @OneToMany(() => InviteCode, (inviteCode) => inviteCode.creator)
  createdInviteCodes?: InviteCode[];

  @OneToMany(
    () => CommunityMember,
    (communityMember) => communityMember.identity
  )
  communityMemberships!: CommunityMember[];

  @Column("boolean", { nullable: false, default: false })
  canCreateCommunity!: boolean;

  @Column("boolean", { nullable: false, default: false })
  canListIdentities!: boolean;

  @Column("boolean", { nullable: false, default: false })
  canListInviteCodes!: boolean;

  @Column("boolean", { nullable: false, default: false })
  canCreateInviteCode!: boolean;

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.invitee
  )
  receivedInvitations!: CommunityInvitation[];

  @OneToMany(
    () => CommunityInvitation,
    (communityInvitation) => communityInvitation.inviter
  )
  createdInvitations!: CommunityInvitation[];
}

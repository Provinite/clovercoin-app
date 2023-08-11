import { Field, ID, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Identity } from "../Identity/Identity.js";
import { ManyToOneField, RelationIdField } from "../relationFieldDecorators.js";

/**
 * Model representing an invite code bucket.
 */
@ObjectType()
@Entity()
export class InviteCode {
  @PrimaryColumn("text")
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Int, { nullable: false })
  @Column("integer", { nullable: false })
  claimCount!: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  maxClaims!: number;

  @RelationIdField<InviteCode>({
    relation: (inviteCode) => inviteCode.creator,
    nullable: false,
  })
  creatorId!: string;

  @ManyToOneField<Identity>({
    type: () => Identity,
    nullable: false,
    columnName: "creatorId",
    foreignColumnName: "id",
    inverseSide: (identity) => identity.createdInviteCodes,
  })
  creator: Identity | undefined;
}

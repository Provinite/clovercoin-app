import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from "typeorm";
import type { Relation } from "typeorm";
import { Account } from "../Account/Account.js";

@Entity()
/**
 * This index is intended to prevent there from ever being more than one valid token
 * per account.
 */
@Index(
  "unique_reset_token_valid_per_account",
  ["accountId", "revokedAt", "claimedAt"],
  {
    where: '"revokedAt" IS NULL and "claimedAt" IS NULL',
    unique: true,
  }
)
export class ResetToken {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid")
  @RelationId<ResetToken>((resetToken) => resetToken.account)
  accountId!: string;

  @ManyToOne(() => Account, { nullable: false })
  @JoinColumn({
    name: "accountId",
    referencedColumnName: "id",
  })
  account?: Relation<Account>;

  @Column("timestamptz", { nullable: true })
  claimedAt: Date | null = null;

  @Column("boolean", { nullable: true })
  revokedAt: Date | null = null;

  @Column("timestamptz", { nullable: false })
  expiresAt!: Date;
}

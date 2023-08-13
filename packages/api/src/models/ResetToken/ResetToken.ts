import {
  Column,
  CreateDateColumn,
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
 * per account. This index is tracked manually by migrations because typeorm does
 * not support the NULLS NOT DISTINCT clause on indexes yet.
 */
@Index("unique_reset_token_valid_per_account", { synchronize: false })
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

  @CreateDateColumn({
    type: "timestamptz",
    nullable: false,
  })
  issuedAt!: Date;
}

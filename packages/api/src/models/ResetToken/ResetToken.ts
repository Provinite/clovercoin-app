import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from "typeorm";
import type { Relation } from "typeorm";
import { Account } from "../Account/Account.js";

@Entity()
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

  @Column("integer", { nullable: false })
  @Check(
    "chk_reset_token_is_not_over_claimed",
    '"claimCount" <= 1 AND "claimCount" >= 0'
  )
  claimCount!: number;
}

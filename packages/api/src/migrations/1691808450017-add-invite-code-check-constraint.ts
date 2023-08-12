import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInviteCodeCheckConstraint1691808450017
  implements MigrationInterface
{
  name = "AddInviteCodeCheckConstraint1691808450017";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite_code" ADD CONSTRAINT "chk_invite_code_not_over_used" CHECK ("claimCount" <= "maxClaims")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite_code" DROP CONSTRAINT "chk_invite_code_not_over_used"`
    );
  }
}

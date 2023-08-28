import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdentityCanCreateInviteCodePerm1693180926946
  implements MigrationInterface
{
  name = "AddIdentityCanCreateInviteCodePerm1693180926946";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canListInviteCodes" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canCreateInviteCode" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canCreateInviteCode"`
    );
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canListInviteCodes"`
    );
  }
}

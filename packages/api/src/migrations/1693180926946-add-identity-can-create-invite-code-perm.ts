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
    if (process.env.CC_ADMIN_EMAIL) {
      await queryRunner.query(
        `
      UPDATE "identity"
      SET 
        "canCreateInviteCode" = $1, 
        "canListInviteCodes" = $1
      WHERE
        "email" = $2
          `,
        [true, process.env.CC_ADMIN_EMAIL]
      );
    }
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

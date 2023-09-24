import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdentityCanGrantGlobalPermissionsField1695513359643
  implements MigrationInterface
{
  name = "AddIdentityCanGrantGlobalPermissionsField1695513359643";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canGrantGlobalPermissions" boolean NOT NULL DEFAULT false`
    );
    if (process.env.CC_ADMIN_EMAIL) {
      await queryRunner.query(
        `UPDATE "identity" SET "canGrantGlobalPermissions" = $1 WHERE "email" = $2`,
        [true, process.env.CC_ADMIN_EMAIL]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canGrantGlobalPermissions"`
    );
  }
}

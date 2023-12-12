import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdentityCanCreateCommunityColumn1692845317726
  implements MigrationInterface
{
  name = "AddIdentityCanCreateCommunityColumn1692845317726";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canCreateCommunity" boolean NOT NULL DEFAULT false`
    );
    if (process.env.CC_ADMIN_EMAIL) {
      await queryRunner.query(
        `UPDATE "identity" SET "canCreateCommunity" = $1 WHERE "email" = $2`,
        [true, process.env.CC_ADMIN_EMAIL]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canCreateCommunity"`
    );
  }
}

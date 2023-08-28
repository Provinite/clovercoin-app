import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdentityCanCreateCommunityColumn1692845317726
  implements MigrationInterface
{
  name = "AddIdentityCanCreateCommunityColumn1692845317726";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canCreateCommunity" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canCreateCommunity"`
    );
  }
}

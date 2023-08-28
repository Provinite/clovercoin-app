import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommunityRoleCanEditCritterPermission1693110836623
  implements MigrationInterface
{
  name = "AddCommunityRoleCanEditCritterPermission1693110836623";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "canEditCritter" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "canEditCritter"`);
  }
}

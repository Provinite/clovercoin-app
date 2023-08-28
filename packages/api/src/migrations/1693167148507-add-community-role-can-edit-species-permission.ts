import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommunityRoleCanEditSpeciesPermission1693167148507
  implements MigrationInterface
{
  name = "AddCommunityRoleCanEditSpeciesPermission1693167148507";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "canEditSpecies" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "canEditSpecies"`);
  }
}

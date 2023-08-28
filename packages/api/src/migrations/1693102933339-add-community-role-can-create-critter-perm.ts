import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommunityRoleCanCreateCritterPerm1693102933339
  implements MigrationInterface
{
  name = "AddCommunityRoleCanCreateCritterPerm1693102933339";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "canCreateCritter" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" DROP COLUMN "canCreateCritter"`
    );
  }
}

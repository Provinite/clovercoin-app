import type { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCritterTraitsToJsonb1690779921209
  implements MigrationInterface
{
  name = "ChangeCritterTraitsToJsonb1690779921209";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "critter" DROP COLUMN "traitValues"`);
    await queryRunner.query(
      `ALTER TABLE "critter" ADD "traitValues" jsonb NOT NULL DEFAULT '[]'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "critter" DROP COLUMN "traitValues"`);
    await queryRunner.query(
      `ALTER TABLE "critter" ADD "traitValues" jsonb array NOT NULL DEFAULT '{}'`
    );
  }
}

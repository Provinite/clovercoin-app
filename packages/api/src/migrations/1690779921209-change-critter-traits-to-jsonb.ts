/**
 * @file This migration modifies the "critter"."traitValues" column. It changes
 * it from a jsonb array to a normal jsonb field (that will contain an array
 * in practice). I don't know if this is actually preferable, but it is necessary
 * to make TypeORM happy. It doesn't seem to work properly with jsonb array columns.
 */
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

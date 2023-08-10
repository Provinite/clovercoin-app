/**
 * @file This migration creates a GIN index on the "critters"."traitValues" field.
 * This index is intended to allow performant querying (under certain conditions)
 * for critters by their trait values.
 */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCritterTraitValuesGinIndex1691043318922
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "critter_traitvalues_gin_idx" on "critter" using gin("traitValues");`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "critter_traitvalues_gin_idx";`);
  }
}

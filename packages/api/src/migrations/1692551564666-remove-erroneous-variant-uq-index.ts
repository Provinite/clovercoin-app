import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveErroneousVariantUqIndex1692551564666
  implements MigrationInterface
{
  name = "RemoveErroneousVariantUqIndex1692551564666";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "species_variant" DROP CONSTRAINT "UQ_ce47477aaea15609764842deea3"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "species_variant" ADD CONSTRAINT "UQ_ce47477aaea15609764842deea3" UNIQUE ("id", "speciesId")`
    );
  }
}

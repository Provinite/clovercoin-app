import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTraitListsTable1692510423335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trait_list" RENAME TO "species_variant"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "species_variant" RENAME TO "trait_list"`
    );
  }
}

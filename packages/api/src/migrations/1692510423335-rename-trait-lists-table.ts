import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTraitListsTable1692510423335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("trait_list", "species_variant");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("species_variant", "trait_list");
  }
}

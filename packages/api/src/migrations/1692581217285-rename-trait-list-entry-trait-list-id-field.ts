import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTraitListEntryTraitListIdField1692581217285
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" RENAME COLUMN "traitListId" TO "speciesVariantId"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" RENAME COLUMN "speciesVariantId" TO "traitListId"`
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameEnumValueSettingTraitListFields1692573382888
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" RENAME COLUMN "traitListId" TO "speciesVariantId"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" RENAME COLUMN "speciesVariantId" TO "traitListId"`
    );
  }
}

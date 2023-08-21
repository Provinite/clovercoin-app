import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCritterTraitListIdColumn1692560972528
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("critter", "traitListId", "variantId");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("critter", "variantId", "traitListId");
  }
}

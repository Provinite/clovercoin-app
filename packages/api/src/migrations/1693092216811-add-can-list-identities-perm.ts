import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCanListIdentitiesPerm1693092216811
  implements MigrationInterface
{
  name = "AddCanListIdentitiesPerm1693092216811";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canListIdentities" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canListIdentities"`
    );
  }
}

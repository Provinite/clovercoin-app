import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCanListIdentitiesPerm1693092216811
  implements MigrationInterface
{
  name = "AddCanListIdentitiesPerm1693092216811";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" ADD "canListIdentities" boolean NOT NULL DEFAULT false`
    );
    if (process.env.CC_ADMIN_EMAIL) {
      await queryRunner.query(
        `UPDATE "identity" SET "canListIdentities" = $1 WHERE "email" = $2`,
        [true, process.env.CC_ADMIN_EMAIL]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identity" DROP COLUMN "canListIdentities"`
    );
  }
}

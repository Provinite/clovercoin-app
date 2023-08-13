import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetTokenTable1691903415631 implements MigrationInterface {
  name = "AddResetTokenTable1691903415631";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset_token" ("id" uuid NOT NULL, "accountId" uuid NOT NULL, "claimedAt" TIMESTAMP WITH TIME ZONE, "revokedAt" boolean, "issuedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_93e1171b4a87d2d0478295f1a99" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_reset_token_valid_per_account" ON "reset_token" ("accountId", "revokedAt", "claimedAt") NULLS NOT DISTINCT WHERE "revokedAt" IS NULL and "claimedAt" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "reset_token" ADD CONSTRAINT "FK_3fbb045fd52d7556cec0fbbbb7b" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reset_token" DROP CONSTRAINT "FK_3fbb045fd52d7556cec0fbbbb7b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."unique_reset_token_valid_per_account"`
    );
    await queryRunner.query(`DROP TABLE "reset_token"`);
  }
}

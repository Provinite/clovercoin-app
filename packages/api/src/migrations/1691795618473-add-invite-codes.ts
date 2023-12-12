import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInviteCodes1691795618473 implements MigrationInterface {
  name = "AddInviteCodes1691795618473";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invite_code" ("id" text NOT NULL, "claimCount" integer NOT NULL, "maxClaims" integer NOT NULL, "creatorId" uuid NOT NULL, CONSTRAINT "PK_a8940979efb1a84ca3470a09c85" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "invite_code" ADD CONSTRAINT "FK_f67caa3921f3b6acd2d6b0c5ebb" FOREIGN KEY ("creatorId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite_code" DROP CONSTRAINT "FK_f67caa3921f3b6acd2d6b0c5ebb"`
    );
    await queryRunner.query(`DROP TABLE "invite_code"`);
  }
}

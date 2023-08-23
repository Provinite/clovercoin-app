import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1692753280259 implements MigrationInterface {
  name = "Check1692753280259";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "communityId" uuid NOT NULL, "canCreateSpecies" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ROLE_COMMUNITY_NAME" UNIQUE ("name", "communityId"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" DROP COLUMN "role"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" ADD "roleId" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_ROLE_COMMUNITY_ID_COMMUNITY_ID" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" ADD CONSTRAINT "FK_COMMUNITY_MEMBER_ROLE_ID_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "community_member" DROP CONSTRAINT "FK_COMMUNITY_MEMBER_ROLE_ID_ROLE_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_ROLE_COMMUNITY_ID_COMMUNITY_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" DROP COLUMN "roleId"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" ADD "role" character varying NOT NULL DEFAULT 'member'`
    );
    await queryRunner.query(`DROP TABLE "role"`);
  }
}

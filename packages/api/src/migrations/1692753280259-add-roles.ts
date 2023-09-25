import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1692753280259 implements MigrationInterface {
  name = "AddRoles1692753280259";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" text NOT NULL,
        "communityId" uuid NOT NULL, 

        "canCreateSpecies" boolean NOT NULL DEFAULT false,
        "canEditSpecies" boolean NOT NULL DEFAULT false,

        "canCreateCritter" boolean NOT NULL DEFAULT false,
        "canEditCritter" boolean NOT NULL default false,

        "canCreateInviteCode" boolean NOT NULL DEFAULT false,
        "canListInviteCodes" boolean NOT NULL DEFAULT false,

        "canCreateRole" boolean NOT NULL DEFAULT false,
        "canEditRole" boolean NOT NULL DEFAULT false,

        CONSTRAINT "UQ_ROLE_COMMUNITY_NAME" UNIQUE ("name", "communityId"),
        CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )`
    );

    const communities = await queryRunner.query(`SELECT * FROM "community"`);
    for (const community of communities) {
      // create default roles for every community

      await queryRunner.query(
        `
      INSERT INTO "role"(
        "communityId", "name",
        "canCreateSpecies", "canEditSpecies",
        "canCreateCritter", "canEditCritter",
        "canCreateInviteCode", "canListInviteCodes",
        "canCreateRole", "canEditRole"
      ) VALUES(
        $1, $2,
        $3, $4,
        $5, $6,
        $7, $8,
        $9, $10
      )`,
        [
          community.id,
          "Admin",
          /* canCreateSpecies */ true,
          /* canEditSpecies */ true,
          /* canCreateCritter */ true,
          /* canEditCritter */ true,
          /* canCreateInviteCode */ true,
          /* canListInviteCodes */ true,
          /* canCreateRole */ true,
          /* canEditRole */ true,
        ]
      );

      await queryRunner.query(
        `
      INSERT INTO "role"(
        "communityId", "name",
        "canCreateSpecies", "canEditSpecies",
        "canCreateCritter", "canEditCritter",
        "canCreateInviteCode", "canListInviteCodes",
        "canCreateRole", "canEditRole"
      ) VALUES(
        $1, $2,
        $3, $4,
        $5, $6,
        $7, $8,
        $9, $10
      )`,
        [
          community.id,
          "Moderator",
          /* canCreateSpecies */ false,
          /* canEditSpecies */ false,
          /* canCreateCritter */ true,
          /* canEditCritter */ true,
          /* canCreateInviteCode */ false,
          /* canListInviteCodes */ true,
          /* canCreateRole */ false,
          /* canEditRole */ false,
        ]
      );

      await queryRunner.query(
        `
      INSERT INTO "role"(
        "communityId", "name",
        "canCreateSpecies", "canEditSpecies",
        "canCreateCritter", "canEditCritter",
        "canCreateInviteCode", "canListInviteCodes",
        "canCreateRole", "canEditRole"
      ) VALUES(
        $1, $2,
        $3, $4,
        $5, $6,
        $7, $8,
        $9, $10
      )`,
        [
          community.id,
          "Member",
          /* canCreateSpecies */ false,
          /* canEditSpecies */ false,
          /* canCreateCritter */ false,
          /* canEditCritter */ false,
          /* canCreateInviteCode */ false,
          /* canListInviteCodes */ false,
          /* canCreateRole */ false,
          /* canEditRole */ false,
        ]
      );
    }
    // remove unused column
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

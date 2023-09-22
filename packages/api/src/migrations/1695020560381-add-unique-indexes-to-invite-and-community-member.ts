import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexesToInviteAndCommunityMember1695020560381
  implements MigrationInterface
{
  name = "AddUniqueIndexesToInviteAndCommunityMember1695020560381";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_COMMUNITY_INVITATION_ROLE_ID_INVITEE_ID" ON "community_invitation" ("roleId", "inviteeId") WHERE "acceptedAt" IS NULL and "declinedAt" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" ADD CONSTRAINT "UQ_COMMUNITY_MEMBER_ROLE_ID_IDENTITY_ID" UNIQUE ("roleId", "identityId")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "community_member" DROP CONSTRAINT "UQ_COMMUNITY_MEMBER_ROLE_ID_IDENTITY_ID"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_COMMUNITY_INVITATION_ROLE_ID_INVITEE_ID"`
    );
  }
}

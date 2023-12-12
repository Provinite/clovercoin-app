import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommunityInvitationTable1694991481498
  implements MigrationInterface
{
  name = "AddCommunityInvitationTable1694991481498";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "community_invitation" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "roleId" uuid NOT NULL,
        "inviteeId" uuid NOT NULL,
        "inviterId" uuid NOT NULL,
        "acceptedAt" TIMESTAMP WITH TIME ZONE,
        "declinedAt" TIMESTAMP WITH TIME ZONE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()

        CONSTRAINT "CHK_COMMUNITY_INVITATION_NOT_ACCEPTED_AND_DECLINED"
        CHECK ("acceptedAt" IS NULL OR "declinedAt" IS NULL),
        CONSTRAINT "PK_9b0425f443f7857a28b2509cfec" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "community_invitation" ADD CONSTRAINT "FK_COMMUNITY_INVITATION_ROLE_ID_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "community_invitation" ADD CONSTRAINT "FK_COMMUNITY_INVITATION_INVITEE_ID_IDENTITY_ID" FOREIGN KEY ("inviteeId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "community_invitation" ADD CONSTRAINT "FK_COMMUNITY_INVITATION_INVITER_ID_IDENTITY_ID" FOREIGN KEY ("inviterId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "community_invitation" DROP CONSTRAINT "FK_COMMUNITY_INVITATION_INVITER_ID_IDENTITY_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_invitation" DROP CONSTRAINT "FK_COMMUNITY_INVITATION_INVITEE_ID_IDENTITY_ID"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_invitation" DROP CONSTRAINT "FK_COMMUNITY_INVITATION_ROLE_ID_ROLE_ID"`
    );
    await queryRunner.query(`DROP TABLE "community_invitation"`);
  }
}

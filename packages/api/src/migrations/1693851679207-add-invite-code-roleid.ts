import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInviteCodeRoleid1693851679207 implements MigrationInterface {
  name = "AddInviteCodeRoleid1693851679207";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invite_code" ADD "roleId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "invite_code" ADD CONSTRAINT "FK_INVITE_CODE_ROLE_ID_ROLE_ID" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invite_code" DROP CONSTRAINT "FK_INVITE_CODE_ROLE_ID_ROLE_ID"`
    );
    await queryRunner.query(`ALTER TABLE "invite_code" DROP COLUMN "roleId"`);
  }
}

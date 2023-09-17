import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleManagementPerms1694912376332 implements MigrationInterface {
  name = "AddRoleManagementPerms1694912376332";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "canCreateRole" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "canEditRole" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "canEditRole"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "canCreateRole"`);
  }
}

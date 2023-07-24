import type { MigrationInterface, QueryRunner } from "typeorm";
export class initializeDb1690172455074 implements MigrationInterface {
  name = "initializeDb1690172455074";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "identity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_0d9005670fa2ee7dcc48842f64d" UNIQUE ("email"), CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "identityId" uuid NOT NULL, CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "community" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_696fdadbf0a710efbbf9d98ad9f" UNIQUE ("name"), CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "community_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL DEFAULT 'member', "identityId" uuid NOT NULL, CONSTRAINT "PK_520250d7bb8234f4149f5ff9b46" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trait_list_entry_valuetype_enum" AS ENUM('string', 'timestamp', 'integer', 'enum')`
    );
    await queryRunner.query(
      `CREATE TABLE "trait_list_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "traitId" uuid NOT NULL, "traitListId" uuid NOT NULL, "order" smallint NOT NULL, "required" boolean NOT NULL, "valueType" "public"."trait_list_entry_valuetype_enum" NOT NULL, "defaultValueString" character varying, "defaultValueInt" integer, "defaultValueTimestamp" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d21c60e1970c8ad6758cd65d119" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."trait_valuetype_enum" AS ENUM('string', 'timestamp', 'integer', 'enum')`
    );
    await queryRunner.query(
      `CREATE TABLE "trait" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "valueType" "public"."trait_valuetype_enum" NOT NULL, "speciesId" uuid NOT NULL, CONSTRAINT "PK_c5d145e577199fe58afbf2a1b2d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "enum_value" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "traitId" uuid NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_60b5e2494c557b60a686f3ee49c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "enum_value_setting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enumValueId" uuid NOT NULL, "traitListId" uuid NOT NULL, CONSTRAINT "UQ_3560cef16c43083407f0b7a4cd4" UNIQUE ("traitListId", "enumValueId"), CONSTRAINT "PK_48d228f252f706a7830a040a23d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "trait_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "speciesId" uuid NOT NULL, CONSTRAINT "UQ_c449a78b8eb0a258c313ddfcdf7" UNIQUE ("id", "speciesId"), CONSTRAINT "PK_7cc50b9309df331e6ec7b5eb611" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "communityId" uuid NOT NULL, "hasImage" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "critter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "speciesId" uuid NOT NULL, "ownerId" uuid NOT NULL, "traitListId" uuid NOT NULL, "traitValues" jsonb array NOT NULL DEFAULT '{}', CONSTRAINT "PK_62afbcf16bcd943069fd5a38977" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "critter_ownership_change" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fromIdentityId" uuid, "toIdentityId" uuid NOT NULL, CONSTRAINT "PK_ee11f293ff31ab446c0aee45c34" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_262deacbb63d76509c78b36166e" FOREIGN KEY ("identityId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" ADD CONSTRAINT "FK_1af7e557b638e25cf487cb0c66b" FOREIGN KEY ("identityId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" ADD CONSTRAINT "FK_2f2b5a9ef8b2060e65a8ea8dc72" FOREIGN KEY ("traitId") REFERENCES "trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" ADD CONSTRAINT "FK_6a9e092e68655161d7934f3677f" FOREIGN KEY ("traitListId") REFERENCES "trait_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trait" ADD CONSTRAINT "FK_0288cba1162ed8c48ec3c73a975" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value" ADD CONSTRAINT "FK_b203f9ca950f0587e26fadde442" FOREIGN KEY ("traitId") REFERENCES "trait"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" ADD CONSTRAINT "FK_d29d07896675d1ab7aa2c1a3b1e" FOREIGN KEY ("traitListId") REFERENCES "trait_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" ADD CONSTRAINT "FK_39c63c3bf1ca4d492cc8d2d2e78" FOREIGN KEY ("enumValueId") REFERENCES "enum_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list" ADD CONSTRAINT "FK_966982509647dc386b75ee2d143" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "species" ADD CONSTRAINT "FK_8657e0248ed27e8ce79170ac1a5" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" ADD CONSTRAINT "FK_061ba8c213c18467de5b22988d8" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" ADD CONSTRAINT "FK_e4b673a4b51206735b052826379" FOREIGN KEY ("ownerId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" ADD CONSTRAINT "FK_111918547f4811d15cbcb9d4624" FOREIGN KEY ("traitListId") REFERENCES "trait_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "critter_ownership_change" ADD CONSTRAINT "FK_373ad66dd799f451f414f7f86e3" FOREIGN KEY ("fromIdentityId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "critter_ownership_change" ADD CONSTRAINT "FK_afd6a73c03a2ba6988616a45207" FOREIGN KEY ("toIdentityId") REFERENCES "identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "critter_ownership_change" DROP CONSTRAINT "FK_afd6a73c03a2ba6988616a45207"`
    );
    await queryRunner.query(
      `ALTER TABLE "critter_ownership_change" DROP CONSTRAINT "FK_373ad66dd799f451f414f7f86e3"`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" DROP CONSTRAINT "FK_111918547f4811d15cbcb9d4624"`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" DROP CONSTRAINT "FK_e4b673a4b51206735b052826379"`
    );
    await queryRunner.query(
      `ALTER TABLE "critter" DROP CONSTRAINT "FK_061ba8c213c18467de5b22988d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "species" DROP CONSTRAINT "FK_8657e0248ed27e8ce79170ac1a5"`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list" DROP CONSTRAINT "FK_966982509647dc386b75ee2d143"`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" DROP CONSTRAINT "FK_39c63c3bf1ca4d492cc8d2d2e78"`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value_setting" DROP CONSTRAINT "FK_d29d07896675d1ab7aa2c1a3b1e"`
    );
    await queryRunner.query(
      `ALTER TABLE "enum_value" DROP CONSTRAINT "FK_b203f9ca950f0587e26fadde442"`
    );
    await queryRunner.query(
      `ALTER TABLE "trait" DROP CONSTRAINT "FK_0288cba1162ed8c48ec3c73a975"`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" DROP CONSTRAINT "FK_6a9e092e68655161d7934f3677f"`
    );
    await queryRunner.query(
      `ALTER TABLE "trait_list_entry" DROP CONSTRAINT "FK_2f2b5a9ef8b2060e65a8ea8dc72"`
    );
    await queryRunner.query(
      `ALTER TABLE "community_member" DROP CONSTRAINT "FK_1af7e557b638e25cf487cb0c66b"`
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_262deacbb63d76509c78b36166e"`
    );
    await queryRunner.query(`DROP TABLE "critter_ownership_change"`);
    await queryRunner.query(`DROP TABLE "critter"`);
    await queryRunner.query(`DROP TABLE "species"`);
    await queryRunner.query(`DROP TABLE "trait_list"`);
    await queryRunner.query(`DROP TABLE "enum_value_setting"`);
    await queryRunner.query(`DROP TABLE "enum_value"`);
    await queryRunner.query(`DROP TABLE "trait"`);
    await queryRunner.query(`DROP TYPE "public"."trait_valuetype_enum"`);
    await queryRunner.query(`DROP TABLE "trait_list_entry"`);
    await queryRunner.query(
      `DROP TYPE "public"."trait_list_entry_valuetype_enum"`
    );
    await queryRunner.query(`DROP TABLE "community_member"`);
    await queryRunner.query(`DROP TABLE "community"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "identity"`);
  }
}

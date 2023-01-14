import { MigrationInterface, QueryRunner } from "typeorm";

export class createAndConfigTables1673641955321 implements MigrationInterface {
  name = "createAndConfigTables1673641955321";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "transferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "date" date NOT NULL DEFAULT now(), "value" numeric(30,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "receiverAccountId" integer, "senderAccountId" integer, CONSTRAINT "PK_6f24c4f3799e6c0641916df19d2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" date NOT NULL, "CPF" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF"), CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "money" numeric(30,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "finances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100) NOT NULL, "value" numeric(30,2) NOT NULL, "isIncome" boolean NOT NULL, "isTransference" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_dd84717ec8f1c29d8dd8687b6fd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "finances_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoryId" uuid, "financeId" uuid, CONSTRAINT "PK_f399a44c98566f8e091608f8e90" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "transferences" ADD CONSTRAINT "FK_0ae08817631dfa1c1e6c7da2e5d" FOREIGN KEY ("receiverAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transferences" ADD CONSTRAINT "FK_9f6bf2bad1b247ba4aea5abae17" FOREIGN KEY ("senderAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "finances" ADD CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "finances_categories" ADD CONSTRAINT "FK_953949cea46a566e1a10f62a604" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "finances_categories" ADD CONSTRAINT "FK_a49b82f5fc916396809bbc7d3f9" FOREIGN KEY ("financeId") REFERENCES "finances"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO category (name) VALUES ('Compras'), ('Energia'), ('Água'), ('Internet'), ('Boletos'), ('Lazer'), ('Gasto Mensal'), ('Salário'), ('Transference')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "finances_categories" DROP CONSTRAINT "FK_a49b82f5fc916396809bbc7d3f9"`);
    await queryRunner.query(`ALTER TABLE "finances_categories" DROP CONSTRAINT "FK_953949cea46a566e1a10f62a604"`);
    await queryRunner.query(`ALTER TABLE "finances" DROP CONSTRAINT "FK_2a97e4910ff8c90cd7910d569df"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
    await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_9f6bf2bad1b247ba4aea5abae17"`);
    await queryRunner.query(`ALTER TABLE "transferences" DROP CONSTRAINT "FK_0ae08817631dfa1c1e6c7da2e5d"`);
    await queryRunner.query(`DROP TABLE "finances_categories"`);
    await queryRunner.query(`DROP TABLE "finances"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "transferences"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class creacion1666657348611 implements MigrationInterface {
    name = 'creacion1666657348611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "categoriaId" varchar)`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "email" varchar NOT NULL, "telefone" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_producto" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "categoriaId" varchar, CONSTRAINT "FK_6465b0476dcfd393c4808d53b95" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_producto"("id", "nombre", "descripcion", "precio", "categoriaId") SELECT "id", "nombre", "descripcion", "precio", "categoriaId" FROM "producto"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`ALTER TABLE "temporary_producto" RENAME TO "producto"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" RENAME TO "temporary_producto"`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "descripcion" varchar NOT NULL, "precio" integer NOT NULL, "categoriaId" varchar)`);
        await queryRunner.query(`INSERT INTO "producto"("id", "nombre", "descripcion", "precio", "categoriaId") SELECT "id", "nombre", "descripcion", "precio", "categoriaId" FROM "temporary_producto"`);
        await queryRunner.query(`DROP TABLE "temporary_producto"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "producto"`);
    }

}

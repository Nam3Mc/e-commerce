import { MigrationInterface, QueryRunner } from "typeorm";

export class New1721442570865 implements MigrationInterface {
    name = 'New1721442570865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "product_id" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "description" character varying, "price" numeric(10,2), "stock" integer, "imgUrl" character varying NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjTeYUVmOczg3JN3PsE7QVwrdF_EwnbL0gAA&s', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2), CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "user_id" uuid, "orderDetails_id" uuid, CONSTRAINT "REL_2b64efc7cd4057542f3ab8cab2" UNIQUE ("orderDetails_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "email" character varying(50), "password" character varying(20), "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details_product__products" ("orderDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_a345fd0de87c458a80d6010449c" PRIMARY KEY ("orderDetailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_203e0419b9d6b3759b4487975a" ON "order_details_product__products" ("orderDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3396a747303535e8a5292539c7" ON "order_details_product__products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_09c384ee09c9b0745c9d0544a38" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29" FOREIGN KEY ("orderDetails_id") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_product__products" ADD CONSTRAINT "FK_203e0419b9d6b3759b4487975a1" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_product__products" ADD CONSTRAINT "FK_3396a747303535e8a5292539c79" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_product__products" DROP CONSTRAINT "FK_3396a747303535e8a5292539c79"`);
        await queryRunner.query(`ALTER TABLE "order_details_product__products" DROP CONSTRAINT "FK_203e0419b9d6b3759b4487975a1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_09c384ee09c9b0745c9d0544a38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3396a747303535e8a5292539c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_203e0419b9d6b3759b4487975a"`);
        await queryRunner.query(`DROP TABLE "order_details_product__products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}

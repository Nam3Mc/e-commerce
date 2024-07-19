import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntities1721366833858 implements MigrationInterface {
    name = 'NewEntities1721366833858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29"`);
        await queryRunner.query(`CREATE TABLE "order-details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2), "order_id" uuid, CONSTRAINT "REL_ec9ff51f100cdb57b3bc7fa210" UNIQUE ("order_id"), CONSTRAINT "PK_e141e01011d5b0fe60d5a830ba6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-details_product__products" ("orderDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_b50d5385bca6edc02d2103870e4" PRIMARY KEY ("orderDetailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f7ccd25efa5465d7d46f31b50" ON "order-details_product__products" ("orderDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_444efd708aca9ba25d82d24a09" ON "order-details_product__products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "order-details" ADD CONSTRAINT "FK_ec9ff51f100cdb57b3bc7fa2107" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29" FOREIGN KEY ("orderDetails_id") REFERENCES "order-details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-details_product__products" ADD CONSTRAINT "FK_6f7ccd25efa5465d7d46f31b509" FOREIGN KEY ("orderDetailsId") REFERENCES "order-details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order-details_product__products" ADD CONSTRAINT "FK_444efd708aca9ba25d82d24a092" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order-details_product__products" DROP CONSTRAINT "FK_444efd708aca9ba25d82d24a092"`);
        await queryRunner.query(`ALTER TABLE "order-details_product__products" DROP CONSTRAINT "FK_6f7ccd25efa5465d7d46f31b509"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29"`);
        await queryRunner.query(`ALTER TABLE "order-details" DROP CONSTRAINT "FK_ec9ff51f100cdb57b3bc7fa2107"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_444efd708aca9ba25d82d24a09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f7ccd25efa5465d7d46f31b50"`);
        await queryRunner.query(`DROP TABLE "order-details_product__products"`);
        await queryRunner.query(`DROP TABLE "order-details"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2b64efc7cd4057542f3ab8cab29" FOREIGN KEY ("orderDetails_id") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

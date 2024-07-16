import { Module } from "@nestjs/common";
import { ProdutsController } from "./produts.contorllers";
import { ProductService } from "./products.service";
import { ProductsRepository } from "./products.repository";

@Module({
    providers: [ProductService, ProductsRepository],
    controllers: [ProdutsController]
})

export class ProductsModuel{};
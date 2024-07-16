import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { IProduct } from "./interface/product.interface";
import { ProductGuard } from "src/guards/productCreator.guard";
import { IProductDto } from "./dtos/product.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("products") 

export class ProdutsController {
    constructor (private readonly productService: ProductService) {}

    @Get()
    getProduts(@Query("page") page: string, @Query("limit") limit: string ) {
        return this.productService.getProduts(parseInt(page, 10), parseInt(limit, 10));
    }

    @Get(":id")
    getProductById(@Param("id") id:string) {
        return this.productService.getById(Number(id))
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseGuards(ProductGuard)
    createProduct(@Body() product: IProduct) {
        return this.productService.createProduct(product);
    }

    @Put(":id")
    @UseGuards(ProductGuard, AuthGuard)
    updateProduct(@Param("id") id: string, @Body() product: IProductDto) {
        return this.productService.updateProduct(Number(id), product)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteProduct(@Param("id") id: string) {
        return this.productService.deleteProduct(Number(id))
    }

}
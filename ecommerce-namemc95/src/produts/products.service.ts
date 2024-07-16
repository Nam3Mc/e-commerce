import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { IProduct } from "./interface/product.interface";
import { IProductDto } from "./dtos/product.dto";

@Injectable()

export class ProductService {

    constructor(
        private productsRepository: ProductsRepository
    ) {}

    getProduts(page: number, limit: number) {
        return this.productsRepository.getProducts( page, limit);
    }

    getById(id: number) {
        return this.productsRepository.getProductById(id);
    }

    createProduct(product: IProduct) {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: number, product: IProductDto) {
        return this.productsRepository.updateProductInfo(id, product);
    }

    deleteProduct(id:number) {
        return this.productsRepository.deleteProduct(id)
    }
}
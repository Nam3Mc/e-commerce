import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { NewProductDto } from "./dto/newproduct.dto";

@Injectable()
export class ProductsRepository{

    constructor (
        @InjectRepository(Product)
        private productsDB: Repository<Product>
    ) {}

    async products (page: number, limit: number): Promise<Product[]> {

        const pageNumber = page || 1;
        const limitNumber = limit || 5;

        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber

        return await this.productsDB.find()
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productsDB.findOne({
            where: {id: id, stock: MoreThan(0) }
        })
    }

    async validateProduct(categoryName: string): Promise<boolean> {
        const product = await this.productsDB.findOne({
            where: {name: categoryName}
        })
        if (!product) return false
        return true
    }

    async addProduct(product: NewProductDto): Promise<void> {
        const { name, description, price, stock, imgUrl} = product
        try {
            const exist: boolean = await this.validateProduct(name);
            if (exist) {
                throw new Error ("This product does exist")
            }
            else {
                this.productsDB.save(product)
            }
        } catch (error) {
            throw new Error ("This product does exist")
        }
    }

    async saveProduct(data) {
        this.productsDB.save(data)
    }

    // async deleteProduct(id: number): Promise<void> {
        // const product = this.products.findIndex((product) => product.id === id );
        // this.products.splice(product, 1)
    // }

}

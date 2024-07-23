import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { NewProductDto } from "./dto/newproduct.dto";
import { products } from "src/helpers/dataPreloader";
import { CategoriesRepository } from "src/categories/categories.repository";
import { NewCategoryDto } from "src/categories/dto/newCategory.dto";

@Injectable()
export class ProductsRepository{

    constructor (
        @InjectRepository(Product)
        private productsDB: Repository<Product>,
        private categoriesDB: CategoriesRepository
    ) {}

    async getAllgetProducts(page: number = 1, limit: number = 5): Promise<Product[]> {

        const productsDB: Product[] = await this.productsDB.find({
            relations: ["category_"]
        });
        const categoriesName = []
        if (productsDB.length < 1) {
            for ( const product of products) {
                if (!categoriesName.includes(product.category)) {
                    categoriesName.push(product.category)
                }
            }
            for (const categoryName of categoriesName ) {
                const categoryDto = new NewCategoryDto
                categoryDto.name = categoryName
                const category = await this.categoriesDB.addCategory(categoryDto)
            }

            for ( const product of products ) {
                const { name, description, price, stock} = product
                const category = await this.categoriesDB.getCategoryByName(product.category)
                const newProduct = new Product
                newProduct.name = name
                newProduct.description = description
                newProduct.price = price
                newProduct.stock = stock
                newProduct.category_ = category
                const createdProduct = await this.productsDB.save(newProduct)
            }

            const refreshList = await this.productsDB.find()
            return refreshList
        }
        return productsDB
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

    async addProduct(product: NewProductDto): Promise<string> {
        const { name } = product
        try {
            const exist: boolean = await this.validateProduct(name);
            if (exist) {
                throw new Error ("This product does exist")
            }
            else {
                const id = await this.productsDB.save(product)
                return id.id
            }
        } catch (error) {
            throw new Error ("This product does exist")
        }
    }

    async saveProduct(data: Product): Promise<string> {
        const id = await this.productsDB.save(data)
        return id.id
    }

    async updateProduct(productInfo: Partial<Product>): Promise<string> {
        const { id, name, description, price, stock, imgUrl} = productInfo
        const product = await this.getProductById(id)
        product.name = name
        product.description = description
        product.price = price
        product.stock = stock
        product.imgUrl = imgUrl
        await this.productsDB.save(product);
        return id
    }

    async deleteProduct(id:string): Promise<string> {
        const product: Product = await this.getProductById(id)
        await this.productsDB.delete(product)
        return product.id
    }
}

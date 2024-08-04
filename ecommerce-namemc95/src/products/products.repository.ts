import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { NewProductDto } from "./dto/newproduct.dto";
import { products } from "src/helpers/dataPreloader";
import { CategoriesRepository } from "src/categories/categories.repository";
import { NewCategoryDto } from "src/categories/dto/newCategory.dto";
import { CloudinaryService } from "./cloudinary.service";
import { Category } from "src/categories/entities/category.entity";

@Injectable()
export class ProductsRepository{

    constructor (
        @InjectRepository(Product)
        private productsDB: Repository<Product>,
        private categoriesDB: CategoriesRepository,
        private cloudinaryService: CloudinaryService
    ) {}

    async getAllgetProducts(page: number = 1, limit: number = 5): Promise<Product[]> {
        const productsDB: Product[] = await this.productsDB.find({
            where: { stock: MoreThan (0)},
            relations: ["category_"],
            skip: (page -1) * limit,
            take: limit,
        });
        return productsDB
    } 

    async productsSeeder(): Promise<Product[]> {
        const productsCount = await this.productsDB.count()
        const categoriesName = []
        if (productsCount === 0) {
   
            for ( const product of products) {
                if (!categoriesName.includes(product.category)) {
                    categoriesName.push(product.category)
                }
            }
            for (const categoryName of categoriesName ) {
                const categoryDto = new NewCategoryDto
                categoryDto.name = categoryName
                await this.categoriesDB.addCategory(categoryDto)
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
                await this.productsDB.save(newProduct)
            }
        }
        else {
            return this.getAllgetProducts()
        }
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productsDB.findOne({
            where: {id: id, stock: MoreThan(0) }
        })
        if (!product) {
            throw new NotFoundException("Product does not exist or is not not any available")
        }
        return product
    }

    async validateProduct(name: string): Promise<boolean> {
        const product = await this.productsDB.findOne({
            where: { name : name}
        })
        if (product) return true
        else return false
    }

    async addProduct(product: NewProductDto, productImage: Express.Multer.File): Promise<string> {
        const newProductDto: NewProductDto = JSON.parse(product["productDto"])
        const image = await this.cloudinaryService.uploadImage(productImage)
        const exist: boolean = await this.validateProduct(newProductDto.name)
        if (exist) {
            throw new BadRequestException("Product does exist")
        }
        else {
            const category = await this.categoriesDB.getCategoryByName(newProductDto.name)
            const newProduct = new Product
            newProduct.name = newProductDto.name
            newProduct.description = newProductDto.description
            newProduct.price = newProductDto.price
            newProduct.stock = newProductDto.stock
            newProduct.imgUrl = image.url
            newProduct.category_ = category
            const createdProduct = await this.productsDB.save(newProduct)
            console.log(createdProduct)
            return createdProduct.id
        }
    }

    async saveProduct(data: Product): Promise<string> {
        const id = await this.productsDB.save(data)
        return id.id
    }

    async updateProduct(id: string, productInfo: NewProductDto, newImage: Express.Multer.File): Promise<string> {
        const productDetails = JSON.parse(productInfo["productDto"])
        const newPicture = await this.cloudinaryService.uploadImage(newImage)
        const product = await this.getProductById(id)
        if (!product) {
            throw new BadRequestException("Product not found")
        }
        else {
            product.name = productDetails.name
            product.description = productDetails.description
            product.price = productDetails.price
            product.stock = productDetails.stock
            product.imgUrl = newPicture.url
            await this.productsDB.save(product);
            return product.id
        }
    }

    async deleteProduct(id:string): Promise<string> {
        const product: Product = await this.getProductById(id)
        if (!product) {
            throw new BadRequestException("This product does not exist")
        }
        else {
            await this.productsDB.delete(product)
            return product.id
        }
    }
}

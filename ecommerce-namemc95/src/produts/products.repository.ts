import { Injectable } from "@nestjs/common";
import { IProduct } from "./interface/product.interface";
import { IProductDto } from "./dtos/product.dto";

@Injectable()
export class ProductsRepository{

    private products = [
        {
            id: 1,
            name: "Product One",
            description: "Description of Product One",
            price: 19.99,
            stock: true,
            imgUrl: "https://example.com/product1.jpg"
        },
        {
            id: 2,
            name: "Product Two",
            description: "Description of Product Two",
            price: 29.99,
            stock: false,
            imgUrl: "https://example.com/product2.jpg"
        },
        {
            id: 3,
            name: "Product Three",
            description: "Description of Product Three",
            price: 39.99,
            stock: true,
            imgUrl: "https://example.com/product3.jpg"
        }
    ]

    async getProducts (page: number, limit: number) {

        const pageNumber = page || 1;
        const limitNumber = limit || 5;

        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = startIndex + limitNumber

        return this.products.slice(startIndex, endIndex)
    }

    async getProductById (id: number) {
        return this.products.find((user) => user.id === id);
    }
    async createProduct (product: Omit<IProduct, "id"> ) {
        const id = this.products.length + 1;
        this.products = [...this.products, {id, ...product}]
        return {id, ...product}
    }
    async updateProductInfo (id: number, product: IProductDto): Promise<number> {


        const {name, description, price, stock, imgUrl} = product;
        const updatedProduct = this.products.find((product) => product.id === id);
        updatedProduct.id = id
        updatedProduct.name = name;
        updatedProduct.description = description;
        updatedProduct.price = price;
        updatedProduct.stock = stock;
        updatedProduct.imgUrl = imgUrl;

        return id
    }

    async deleteProduct(id: number): Promise<void> {
        const product = this.products.findIndex((product) => product.id === id );
        this.products.splice(product, 1)
    }

}
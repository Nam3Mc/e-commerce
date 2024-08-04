import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { NewProductDto } from './dto/newproduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProdutsService {

  constructor(
    private productsRepository: ProductsRepository
  ) {}

  getAllgetProducts(page: number, limit: number): Promise<Product []> {
    return this.productsRepository.getAllgetProducts(page, limit);
  }

  seeAllProducts() {
    return this.productsRepository.productsSeeder()
  }

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  addProduct( product: NewProductDto, productImage: Express.Multer.File): Promise<string> {
    return this.productsRepository.addProduct(product, productImage);
  }

  updateProduct(id: string, productInfo: NewProductDto, newImage: Express.Multer.File): Promise<string> {
    return this.productsRepository.updateProduct(id, productInfo, newImage)
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

}

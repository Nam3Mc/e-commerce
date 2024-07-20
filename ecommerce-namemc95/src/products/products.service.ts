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

  getProductById(id: string): Promise<Product> {
    return this.productsRepository.getProductById(id);
  }

  addProduct(product: NewProductDto): Promise<string> {
    return this.productsRepository.addProduct(product);
  }

  updateProduct(productInfo: Product): Promise<string> {
    return this.productsRepository.updateProduct(productInfo)
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

}

import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { NewProductDto } from './dto/newproduct.dto';

@Injectable()
export class ProdutsService {

  constructor(
    private productsRepository: ProductsRepository
  ) {}

  getAll(page:number, limit: number) {
    return this.productsRepository.products(page, limit);
  }

  newPoduct(product: NewProductDto) {
    return this.productsRepository.addProduct(product);
  }

}

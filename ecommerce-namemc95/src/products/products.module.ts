import { Module } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { ProdutsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProdutsService, ProductsRepository],
  controllers: [ProdutsController],
  exports: [ProductsRepository]
})
export class ProductsModule {}

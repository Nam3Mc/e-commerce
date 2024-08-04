import { Module } from '@nestjs/common';
import { ProdutsService } from './products.service';
import { ProdutsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CloudinaryService } from './cloudinary.service';
import { cloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoriesModule
  ],
  providers: [ProdutsService, 
    ProductsRepository,
    cloudinaryConfig,
    CloudinaryService
  ],
  controllers: [ProdutsController],
  exports: [ProductsRepository]
})
export class ProductsModule {}

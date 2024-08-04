// import { Module } from '@nestjs/common';
// import { FilesService } from './files.service';
// import { FilesController } from './files.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { File } from './entities/files.entity';
// import { FilesRepository } from './files.repository';
// import { cloudinaryConfig } from 'src/config/cloudinary';
// import { CloudinaryService } from 'src/products/cloudinary.service';
// import { ProductsModule } from 'src/products/products.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([File]),
//     ProductsModule
//   ],
//   providers: [FilesService, FilesRepository,
//      // INFORMATION FROM CLOUDINARY TO IMPOR 
//     cloudinaryConfig,
//     CloudinaryService,
//   ],
//   controllers: [FilesController],
//   exports: [FilesRepository]
// })
// export class FilesModule {}

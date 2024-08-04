// import { Injectable, NotFoundException  } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { File } from "./entities/files.entity";
// import { Repository } from "typeorm";
// import { CloudinaryService } from "src/products/cloudinary.service";
// import { ProductsRepository } from "src/products/products.repository";

// @Injectable()
// export class FilesRepository {
//     constructor(
//         @InjectRepository(File)
//         private filesDB: Repository<File>,
//         private productRepository: ProductsRepository,
//         private cloudyService: CloudinaryService

//     ) {}

//     async savePicture(id: string, receivedFile: Express.Multer.File) {
//         const product = await this.productRepository.getProductById(id);
//         if (!product) {
//             throw new NotFoundException("Product picture could not be updated")
//         }
//         else {
//             const picture = await this.cloudyService.uploadImage(receivedFile)
//             product.imgUrl = picture.url
//             await this.productRepository.updateProduct(product)
//         }
//     }
// }
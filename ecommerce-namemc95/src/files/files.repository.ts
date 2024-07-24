import { HttpException, Injectable, NotFoundException  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./entities/files.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "src/helpers/cloudinary.service";
import { ProductsRepository } from "src/products/products.repository";

@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(File)
        private filesDB: Repository<File>,
        private productRepository: ProductsRepository,
        private cloudyService: CloudinaryService

    ) {}

    async getFiles(): Promise<File []> {
        const files: File[] = await this.filesDB.find()
        return files
    }

    async saveFile( id: string, receivedFile: Express.Multer.File) {

        // const order = await this.orderRepository.getOrderById(id)
        // const newFile = new File
        // newFile.name = receivedFile.originalname
        // newFile.mimeType = receivedFile.mimetype
        // newFile.data = receivedFile.buffer
        // newFile.order_ = order

        // return await this.filesDB.save(newFile)
    }

    async savePicture(id: string, receivedFile: Express.Multer.File) {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new NotFoundException("Product could pictture could not be updated")
        }
        else {
            const picture = await this.cloudyService.uploadImage(receivedFile)
            product.imgUrl = picture.url
            await this.productRepository.updateProduct(product)
        }
    }
}
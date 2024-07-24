import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { FileDto } from './dtos/file.dto';

@Injectable()
export class FilesService {

  constructor( 
    private readonly filesRepository: FilesRepository
  ) {}

  getFiles() {
    return this.filesRepository.getFiles()
  }

  savePicture(id: string, receivedFile: Express.Multer.File) {
    return this.filesRepository.savePicture(id, receivedFile)
  }

  saveFile(id: string, receivedFile: Express.Multer.File) {
    return this.filesRepository.saveFile(id, receivedFile)
  }  

}

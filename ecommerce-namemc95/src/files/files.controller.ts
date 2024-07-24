import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/helpers/cloudinary.service';
import { FileValidatorPipe } from 'src/pipes/size-validator.pipe';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Get()
  getFiles() {
    return this.filesService.getFiles();
  }

  // @Post("cloud")
  // @UseInterceptors(FileInterceptor("newFile"))
  // savePicture(@Body() id: string, @UploadedFile(
    // validation for files with pipes
    // new ParseFilePipe({
      // validators: [
        // new MaxFileSizeValidator({
          // maxSize: 100000,
          // message: "File must be less than 100kb"
        // }),
        // new FileTypeValidator({
          // fileType: /(jpg|jpg|png|webp)$/
        // })
      // ]
    // })
  // ) receivedFile: Express.Multer.File
  // ) {
    // return this.filesService.savePicture(id, receivedFile)
  // }  

  @Post("uploadImage/:id")
  @UseInterceptors(FileInterceptor("newFile"))
  savePicture(@Param("id") id: string, @UploadedFile(
    new FileValidatorPipe()
  ) receivedFile: Express.Multer.File
  ) {
    return this.filesService.savePicture(id, receivedFile)
  }    



  // Example i need to learn how to modulate this 
  //  this is to uploap files to DB directly 
  @Post()
  @UseInterceptors(FileInterceptor("newFile"))
  saveOne( @UploadedFile() newFile: Express.Multer.File
  ) {
    return newFile
  }

  @Post("save")
  @UseInterceptors(FileInterceptor("newFile")) // this is  fieldname: newFile
  saveFile(@Body() id: string, @UploadedFile()  receivedFile: Express.Multer.File ) { 
    return this.filesService.saveFile(id, receivedFile);
  }
}
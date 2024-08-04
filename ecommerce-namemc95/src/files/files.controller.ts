// import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
// import { FilesService } from './files.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CloudinaryService } from 'src/products/cloudinary.service';
// import { FileValidatorPipe } from 'src/pipes/size-validator.pipe';

// @Controller('files')
// export class FilesController {
//   constructor(
//     private readonly filesService: FilesService,
//   ) {}

//   @Get()
//   getFiles() {
//     return this.filesService.getFiles();
//   }

//   @Post("uploadImage/:id")
//   @UseInterceptors(FileInterceptor("newFile"))
//   savePicture(@Param("id") id: string, @UploadedFile(
//     new FileValidatorPipe()
//   ) receivedFile: Express.Multer.File
//   ) {
//     return this.filesService.savePicture(id, receivedFile)
//   }    


//   @Post()
//   @UseInterceptors(FileInterceptor("newFile"))
//   saveOne( @UploadedFile() newFile: Express.Multer.File
//   ) {
//     return newFile
//   }

//   @Post("save")
//   @UseInterceptors(FileInterceptor("newFile"))
//   saveFile(@Body() id: string, @UploadedFile()  receivedFile: Express.Multer.File ) { 
//     return this.filesService.saveFile(id, receivedFile);
//   }
// }
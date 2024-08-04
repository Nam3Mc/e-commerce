import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, PipeTransform } from "@nestjs/common";

@Injectable()
export class MaxFileSizeTypeValidator extends ParseFilePipe implements PipeTransform{
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: "File must be less than 200kb"
                  }),
                  new FileTypeValidator({
                    fileType: /(jpg|jpg|png|webp)$/
                  })
            ]
        })
    }
}
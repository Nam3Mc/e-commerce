import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const maxSize = .2 * 1024 * 1024
    const allowedTypes = /(jpg|jpg|png|webp)$/

    if (value.size > maxSize) {
      throw new BadRequestException("Fiel size is too big")
    }
    if (!allowedTypes.test(value.mimeType)) {
      throw new BadRequestException("Fiel type is not allowed, please try jpg,jpg,png,webp ")
    }
    return value
  }
}

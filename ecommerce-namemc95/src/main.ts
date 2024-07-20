import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logueeGlobalMiddleware } from './middlewares/globalLoguee.middlleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { error } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logueeGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    // a white list may be added here that will clear and delete any extra field that is not according with Dtos sttructure
    whitelist: true,
    // with adding exception factory error can be handled globay here 
    // these messages will be shown in any endpoint where we have applied 
    // validations though pipes 
    exceptionFactory: (errors) => {
      const clearErrors = errors.map(error => {
        return {prperty: error.property, constrain: error.constraints}
      })
      return new BadRequestException({
        alert: "The following errors have been detected in your reuqets",
        error: clearErrors
      })
    }
  }))
  await app.listen(3000);
}
bootstrap();

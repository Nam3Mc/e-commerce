import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logueeGlobalMiddleware } from './middlewares/globalLoguee.middlleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logueeGlobalMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,

    exceptionFactory: (errors) => {
      const clearErrors = errors.map(error => {
        return {property: error.property, constrain: error.constraints}
      })

      return new BadRequestException({
        alert: "The following errors have been detected in your reuqets",
        error: clearErrors
      })
    }
  }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle("E-commerce API")
    .setDescription("This is an API created to demostrate the full use of this eccomerce App")
    .setVersion("1.0") 
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}

bootstrap();

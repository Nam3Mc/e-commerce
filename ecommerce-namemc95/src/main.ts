import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logueeGlobalMiddleware } from './middlewares/globalLoguee.middlleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logueeGlobalMiddleware);
  await app.listen(3000);
}
bootstrap();

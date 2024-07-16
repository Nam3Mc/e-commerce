import { Module } from '@nestjs/common';
import { UserModules } from './users/users.modules';
import { AuthModels } from './auth/auths.module';
import { ProductsModuel } from './produts/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entitty';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env.development",
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({

        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),

        entities: [User],

        synchronize: true,
        logging: false,

      })
    }),
    UserModules, AuthModels, ProductsModuel],
  controllers: [],
  providers: [],
})
export class AppModule {}

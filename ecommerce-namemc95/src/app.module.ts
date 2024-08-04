import { Module } from '@nestjs/common';
import { UserModules } from './users/users.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderDetailsModule } from './order-details/orderDetails.module';
import typeOrmConfig from './config/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ typeOrmConfig ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ( 
        configService.get('typeorm') )
    }),
    AuthModule,
    UserModules, 
    OrdersModule, 
    CategoriesModule, 
    OrderDetailsModule, 
    ProductsModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: "1h"},
      secret: process.env.JWT_SECRET
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
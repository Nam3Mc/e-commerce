import { Module } from '@nestjs/common';
import { UserModules } from './users/users.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderDetailsModule } from './order-details/orderDetails.module';
import typeOrmConfig from './config/typeorm';
import { ProductsModule } from './products/products.module';

@Module({

  imports: [

    // this is all the confi tu connect to the db
    ConfigModule.forRoot({
      isGlobal: true,
      // here is where we change or inject the key from typeorm lone 32
      load: [ typeOrmConfig ],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ( 
        configService.get('typeorm') )
    }),
    
    UserModules, 
    OrdersModule, 
    CategoriesModule, 
    OrderDetailsModule, 
    ProductsModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}

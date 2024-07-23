import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from "dotenv"
import { registerAs } from "@nestjs/config";

dotenvConfig({
    path: ".env.development"
})

const config = {

    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    // this allows the filed to seach the resources in dist folder with the extentions 
    // here we are teling to the config where the entitiesare located 
    entities: ['dist/**/*.entity{.js,.ts}'],
    // this is teh folder where the migrations files will be located
    migrations: ['dist/migrations/*{.js,.ts}'],

    autoLoadEntities: true, 
    synchronize: true,
    logging: true,
    dropSchema: false
}
// typeorm is the key or clave here and its value is the full object avobe 
// the const config 
// this is configured in the app.module
export default registerAs('typeorm', () => config);


// migrations will be used by calling this file in the cli 
export const connectionSource = new DataSource( config as DataSourceOptions )
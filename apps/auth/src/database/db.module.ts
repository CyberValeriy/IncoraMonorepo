import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_CONFIG } from '../config/app.config';

const config: TypeOrmModuleOptions = {
  type: DB_CONFIG.TYPE as 'postgres',
  host: DB_CONFIG.HOST,
  port: +DB_CONFIG.PORT,
  database: DB_CONFIG.NAME,
  username: DB_CONFIG.USERNAME,
  password: DB_CONFIG.PASSWORD,
  synchronize: true,
};

export default TypeOrmModule.forRoot(config);

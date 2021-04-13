import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { environment } from './env.config';

const { dbOptions, isProduction } = environment;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbOptions.dbHost,
  port: dbOptions.dbPort,
  username: dbOptions.dbUser,
  password: dbOptions.dbPassword,
  database: dbOptions.dbDatabase,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: !isProduction,
};

import { Env, Envirator } from '@status/envirator';
import { JwtModuleOptions } from '@nestjs/jwt';

const env = new Env({ keyToJsProp: true });

interface DatabaseOptions {
  dbHost: string;
  dbPort: number;
  dbPassword: string;
  dbUser: string;
  dbDatabase: string;
}

const jwtOptions: JwtModuleOptions = env.provideMany(
  [
    {
      key: 'JWT_SECRET',
      keyTo: 'secret',
      defaultValue: 'this_is_development_only_value',
    },
    {
      key: 'JWT_EXPIRES_IN',
      keyTo: 'expiresIn',
      mutators: parseInt,
      defaultValue: env.isProduction ? 3600 : 36000,
      productionDefaults: true,
    },
  ],
  ({ secret, expiresIn }) => ({
    secret,
    signOptions: {
      expiresIn,
    },
  }),
);

const database = `taskmanagement_${env.currentEnv}`;

const dbOptions: DatabaseOptions = env.provideMany([
  {
    key: 'DB_PORT',
    mutators: parseInt,
    defaultValue: 5432,
    productionDefaults: true,
  },
  { key: 'DB_USER', defaultValue: 'postgres' },
  { key: 'DB_PASSWORD', defaultValue: 'postgres' },
  { key: 'DB_HOST', defaultValue: 'localhost', productionDefaults: true },
  { key: 'DB_DATABASE', defaultValue: database, productionDefaults: true },
]);

export interface Environment {
  env: Envirator;
  dbOptions: DatabaseOptions;
  isProduction: boolean;
  jwtOptions: JwtModuleOptions;
  port: number;
  currentEnv: string;
}

export const environment: Environment = {
  env,
  dbOptions,
  jwtOptions,
  currentEnv: env.currentEnv,
  isProduction: env.isProduction,
  port: env.provide('PORT', { defaultValue: 3000, mutators: parseInt }),
};

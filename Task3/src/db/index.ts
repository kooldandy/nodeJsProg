import { Sequelize } from 'sequelize';
import { appConfig } from '../config';


const dbConfig = appConfig[process.env.NODE_ENV];

export const database = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  },
);

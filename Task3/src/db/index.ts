

import { Sequelize } from 'sequelize';

// const config = require('../config/config.json')

// const dbConfig = config[process.env.NODE_ENV]

export const database = new Sequelize(
    'daomplte36ui47',
    'gcjqdfizzcsvmk',
    'bdd74036cda9c661cfbef19e62e9703ff44ff5e6e6688474341b3c9602ce8f8d',
    {
        host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
        port: 5432,
        dialect:  'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
              require: true, // This will help you. But you will see nwe error
              rejectUnauthorized: false // This line will fix new error
            }
          },
    },
);

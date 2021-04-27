

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

// import { User } from './../entity/user';
// export let connect = async () => {
//     const connection = await createConnection({
//         type: "postgres",
//         host: "ec2-54-211-176-156.compute-1.amazonaws.com",
//         port: 5432,
//         username: "truppoifmqexdx", // our created username, you can have your own user name
//         password: "c6dc7343f7f396b772e9a2da021c30896137e31108ff3edab7ac1d67d757dffe", // our created username, you can have your own password
//         database: "d6g5euabrn8vjl", // our created database name, you can have your own
//         entities: [
//             User
//         ],
//         synchronize: true,
//         logging: false,
//         ssl: true
//     });
// };
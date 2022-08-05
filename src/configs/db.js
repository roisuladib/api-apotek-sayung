import { Sequelize } from 'sequelize';
import { env } from '../helpers/index.js';

const {
   DB_NAME,
   DB_USERNAME,
   DB_PASSWORD,
   DB_HOST,
   DB_PORT,
   DB_DIALECT,
   DB_URL,
   NODE_ENV
} = env;

 export const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
   host: DB_HOST,
   dialect: DB_DIALECT,
   logging: false,
   timezone: '+07:00'
 });

// export let db = null;
// if (NODE_ENV === 'development') {
//    db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//       host: DB_HOST,
//       dialect: DB_DIALECT,
//       logging: false,
//       timezone: '+07:00'
//    });
// }
// if (NODE_ENV === 'production') {
//    db = new Sequelize(DB_URL, {
//       dialect: DB_DIALECT,
//       protocol: DB_DIALECT,
//       dialectOptions: {
//          ssl: {
//             require: true,
//             rejectUnauthorized: false,
//          },
//       },
//    });
// }

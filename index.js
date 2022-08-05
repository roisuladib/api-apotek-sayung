import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import { db } from './src/configs/index.js';
import { env } from './src/helpers/index.js';

import { assetsRouter, usersRouter, categoriesRouter, unitsRouter, suppliersRouter, productsRouter, transactionsRouter } from './src/routes/index.js';

const app = express();
const { PORT, NODE_ENV, APP_NAME, AUTHOR, EMAIL, HP } = env;

try {
   await db.authenticate();
   console.log('Connection has been established successfully.');
} catch(err) {
   console.error('Unable to connect to the database => : ', err.message);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(assetsRouter);
app.use(usersRouter);
app.use(categoriesRouter);
app.use(unitsRouter);
app.use(suppliersRouter);
app.use(productsRouter);
app.use(transactionsRouter);
app.get('/', (req, res) => res.json({
   status: 'success',
   title: APP_NAME,
   author: AUTHOR,
   contacs: {
      email: EMAIL,
      telephone: HP
   }
}));
app.get('*', (req, res) => res.status(404).json({
   status: 'error',
   message: 'Page not found'
}));

app.listen(PORT, () => console.log(`Server running at port ${PORT} with ${NODE_ENV} environment`));

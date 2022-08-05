import express from 'express';
import { Products } from '../controllers/index.js';

export const productsRouter = express.Router();

const { getId, getAll, create, update, destroy } = Products;

productsRouter.get('/products/:id', getId);
productsRouter.get('/products', getAll);
productsRouter.post('/products', create);
productsRouter.post('/products/:id', update);
productsRouter.delete('/products/:id', destroy);

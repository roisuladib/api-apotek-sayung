import express from 'express';
import { Categories } from '../controllers/index.js';

export const categoriesRouter = express.Router();

const { getId, getAll, create, update, destroy } = Categories;

categoriesRouter.get('/categories/:id', getId);
categoriesRouter.get('/categories', getAll);
categoriesRouter.post('/categories', create);
categoriesRouter.post('/categories/:id', update);
categoriesRouter.delete('/categories/:id', destroy);
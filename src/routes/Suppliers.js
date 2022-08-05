import express from 'express';
import { Suppliers } from '../controllers/index.js';

export const suppliersRouter = express.Router();

const { getId, getAll, create, update, destroy } = Suppliers;

suppliersRouter.get('/suppliers/:id', getId);
suppliersRouter.get('/suppliers', getAll);
suppliersRouter.post('/suppliers', create);
suppliersRouter.post('/suppliers/:id', update);
suppliersRouter.delete('/suppliers/:id', destroy);
import express from 'express';
import { Transactions } from '../controllers/index.js';

export const transactionsRouter = express.Router();

const { getId, getAll, create, update, destroy } = Transactions;

transactionsRouter.get('/transactions/:id', getId);
transactionsRouter.get('/transactions', getAll);
transactionsRouter.post('/transactions', create);
transactionsRouter.post('/transactions/:id', update);
transactionsRouter.delete('/transactions/:id', destroy);

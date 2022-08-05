import express from 'express';
import { Assets } from '../controllers/index.js';

export const assetsRouter = express.Router();
const { getAll, create, destroy } = Assets;
assetsRouter.get('/assets', getAll);
assetsRouter.post('/assets', create);
assetsRouter.delete('/assets/:id', destroy);
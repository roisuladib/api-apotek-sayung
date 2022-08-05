import express from 'express';
import { Units } from '../controllers/index.js';

export const unitsRouter = express.Router();

const { getId, getAll, create, update, destroy } = Units;

unitsRouter.get('/units/:id', getId);
unitsRouter.get('/units', getAll);
unitsRouter.post('/units', create);
unitsRouter.post('/units/:id', update);
unitsRouter.delete('/units/:id', destroy);
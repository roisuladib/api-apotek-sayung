import express from 'express';
import { Users } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js';

export const usersRouter = express.Router();
const {
   getAll,
   getId,
   register,
   login,
   update,
   refreshToken,
   logout,
   destroy
} = Users;
usersRouter.get('/users', verifyToken, getAll);
usersRouter.get('/users/:id', verifyToken, getId);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.delete('/logout', logout);
usersRouter.delete('/users/:id', verifyToken, destroy);
usersRouter.post('/users/:id', update);
usersRouter.get('/token', refreshToken);
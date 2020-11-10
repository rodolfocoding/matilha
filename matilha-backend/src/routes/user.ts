
import { Router } from 'express';
import UserController from '../controllers/UserController';
import authRequired from './authRequired'

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);
userRoutes.patch('/:id', userController.enable);
userRoutes.get('/me', authRequired, userController.me);

export default userRoutes;
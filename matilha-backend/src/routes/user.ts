
import { Router } from 'express';
import UserController from '../controllers/UserController';
import authRequired from './authRequired'

const userRoutes = Router();
const userController = new UserController();

/// userRoutes.post('/', authRequired, userController.create);
userRoutes.post('/', userController.create);

/// userRoutes.patch('/:id', authRequired, userController.enable);
userRoutes.patch('/:id', userController.enable);

/// somente esta rota exigira que a autenticacao(jwt) seja informado para poder
/// ter acesso as informações desse endpoint
userRoutes.get('/me', authRequired, userController.me);

export default userRoutes;
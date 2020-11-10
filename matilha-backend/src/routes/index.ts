
import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';
// import authRequired from './authRequired'

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
    response.json({ message: 'Hello Code83' }),
);

routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
// routes.use(`${prefixRoutes}/users`, authRequired, userRoutes);
routes.use(`${prefixRoutes}/users`, userRoutes);

export default routes;
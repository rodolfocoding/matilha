import { Router } from 'express';
import PointController from '../controllers/PointController';

const pointRoutes = Router();
const pointController = new PointController();

pointRoutes.post('/', pointController.create);

export default pointRoutes;

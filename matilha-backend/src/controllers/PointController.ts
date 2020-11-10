import { Request, Response } from 'express';
import PointService from '../services/PointService';
import PointRepository from '../repositories/PointRepository';

class PointController {
  public async create(request: Request, response: Response): Promise<Response> {
    const pointRespository = new PointRepository();
    const createPoint = new PointService(pointRespository);

    const userId = request.tokenInfo.id;

    const user = await createPoint.execute({
      userId,
      data_ponto: new Date(),
    });

    return response.json(user);
  }
}

export default PointController;

import { hash } from 'bcryptjs';
import IPointRepository from '../repositories/IPointRepository';
import PointRepository from '../repositories/PointRepository';
import Point from '../models/Point';
import { request } from 'express';

interface Request {
  data_ponto: Date;
  userId: string;
}

class PointService {
  private pointRepository: IPointRepository;

  constructor(pointRepository: PointRepository) {
    this.pointRepository = pointRepository;
  }

  public async execute({ data_ponto, userId }: Request): Promise<Point> {
    const user = await this.pointRepository.create({
      data_ponto,
      userId: request.token.id,
    });

    return user;
  }
}

export default PointService;

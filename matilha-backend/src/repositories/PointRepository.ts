import { Repository, getRepository } from 'typeorm';
import Point from '../models/Point';
import IPointRepository from './IPointRepository';
import PointDTO from '../dtos/PointDTO';

class PointRepository implements IPointRepository {
  private ormRepository: Repository<Point>;

  constructor() {
    this.ormRepository = getRepository(Point);
  }

  public async findById(id: string): Promise<Point | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async create({ data_ponto, userId }: PointDTO): Promise<Point> {
    const point = this.ormRepository.create({
      data_ponto, userId
    });

    await this.ormRepository.save(point);

    return point;
  }

  public async save(point: Point): Promise<Point> {
    return this.ormRepository.save(point);
  }
}

export default PointRepository;

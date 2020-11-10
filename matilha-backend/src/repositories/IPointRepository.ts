import Point from '../models/Point';
import PointDTO from '../dtos/PointDTO';

export default interface IPointRepository {
  findById(id: string): Promise<Point | undefined>;
  create(pointDTO: PointDTO): Promise<Point>;
  save(point: Point): Promise<Point>;
}

import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { GetPointsFilterDto } from './dto/get-points-filter.dto';
import { Point } from './point.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Point)
export class PointsRepository extends Repository<Point> {
  private logger = new Logger('TasksRepository', { timestamp: true });

  async getPoints(filterDto: GetPointsFilterDto, user: User): Promise<Point[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const points = await query.getMany();
      return points;
    } catch (error) {
      this.logger.error(
        `Failed to get points from User ${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createPoint(
    createPointDto: CreatePointDto,
    user: User,
  ): Promise<Point> {
    const { lat, lng, title } = createPointDto;

    const point = this.create({
      lat,
      lng,
      title,
      user,
    });

    try {
      await this.save(point);
    } catch (error) {
      this.logger.error(
        `Failed to create a new point ${user.username}. lat/lng: ${lat}/${lng}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return point;
  }
}
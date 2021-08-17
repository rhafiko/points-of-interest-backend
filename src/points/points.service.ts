import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { GetPointsFilterDto } from './dto/get-points-filter.dto';
import { PointsRepository } from './points.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './point.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointsRepository)
    private pointsRepository: PointsRepository,
  ) {}

  async getPoints(filterDto: GetPointsFilterDto, user: User): Promise<Point[]> {
    return this.pointsRepository.getPoints(filterDto, user);
  }

  async getPointById(id: string, user: User): Promise<Point> {
    const found = await this.pointsRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Point with ID ${id} not found`);
    }
    return found;
  }

  createPoint(createPointDto: CreatePointDto, user: User): Promise<Point> {
    return this.pointsRepository.createPoint(createPointDto, user);
  }

  async deletePoint(id: string, user: User): Promise<void> {
    const result = await this.pointsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Point with ID ${id} not found`);
    }
  }

  async updatePoint(id: string, title: string, user: User): Promise<Point> {
    const foundPoint = await this.getPointById(id, user);
    foundPoint.title = title;
    await this.pointsRepository.save(foundPoint);
    return foundPoint;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsRepository } from './points.repository';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PointsRepository]), AuthModule],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}

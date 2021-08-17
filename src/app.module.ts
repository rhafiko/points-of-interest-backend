import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './environment/config.schema';
import { PointsModule } from './points/points.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`src/environment/.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: true,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    PointsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

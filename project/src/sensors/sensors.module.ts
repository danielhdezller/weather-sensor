import { Module } from '@nestjs/common';
import { SensorsController } from './controllers/sensors.controller';
import { SensorsService } from './services/sensors.service';
import { SensorRepository } from './repositories/sensors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorsMapperService } from './services/sensors-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorsController],
  providers: [SensorsService, SensorRepository, SensorsMapperService],
  exports: [SensorsService, SensorsMapperService],
})
export class SensorsModule {}

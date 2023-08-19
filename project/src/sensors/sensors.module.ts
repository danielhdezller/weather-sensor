import { Module } from '@nestjs/common';
import { SensorsController } from './controllers/sensors.controller';
import { SensorsService } from './services/sensors.service';
import { SensorRepository } from './repositories/sensors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorsController],
  providers: [SensorsService, SensorRepository],
  exports: [SensorsService],
})
export class SensorsModule {}

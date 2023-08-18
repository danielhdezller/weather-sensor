import { Module } from '@nestjs/common';
import { SensorsController } from './controllers/sensors.controller';
import { SensorsService } from './services/sensors.service';

@Module({
  controllers: [SensorsController],
  providers: [SensorsService],
  imports: [],
})
export class SensorsModule {}

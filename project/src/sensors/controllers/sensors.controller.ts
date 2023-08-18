import { Controller, Post } from '@nestjs/common';
import { SensorsService } from '../services/sensors.service';

@Controller('api/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('upload')
  uploadSensorData() {
    this.sensorsService.uploadSensorData();
  }
}

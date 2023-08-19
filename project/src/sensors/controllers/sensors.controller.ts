import { Body, Controller, Post } from '@nestjs/common';
import { SensorsService } from '../services/sensors.service';
import { UploadSensorDto } from '../dto/upload-sensor.dto';
import { Sensor } from '../entities/sensor.entity';

@Controller('api/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('upload')
  async uploadSensorData(
    @Body() uploadSensorDto: UploadSensorDto,
  ): Promise<Sensor> {
    return this.sensorsService.uploadSensorData(uploadSensorDto);
  }
}

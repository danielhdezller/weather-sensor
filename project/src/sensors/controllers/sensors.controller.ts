import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorsService } from '../services/sensors.service';
import { UploadSensorDTO } from '../dto/upload-sensor.dto';
import { Sensor } from '../entities/sensor.entity';
import { SensorSearchDTO } from '../dto/search-sensor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('api/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('upload')
  async uploadSensorData(
    @Body() uploadSensorDTO: UploadSensorDTO,
  ): Promise<Sensor> {
    return this.sensorsService.uploadSensorData(uploadSensorDTO);
  }

  @Get('search')
  async searchSensorData(@Body() sensorSearchDTO: SensorSearchDTO) {
    return this.sensorsService.searchSensorData(sensorSearchDTO);
  }
}

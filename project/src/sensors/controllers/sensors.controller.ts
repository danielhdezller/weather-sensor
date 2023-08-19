import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorsService } from '../services/sensors.service';
import { UploadSensorDTO } from '../dto/upload-sensor.dto';
import { Sensor } from '../entities/sensor.entity';
import { SensorSearchDTO } from '../dto/search-sensor.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('upload')
  @ApiResponse({ type: Sensor })
  async uploadSensorData(
    @Body() uploadSensorDTO: UploadSensorDTO,
  ): Promise<Sensor> {
    return this.sensorsService.uploadSensorData(uploadSensorDTO);
  }

  @Get('search')
  @ApiResponse({ type: [Sensor] })
  async searchSensorData(
    @Body() sensorSearchDTO: SensorSearchDTO,
  ): Promise<Sensor[]> {
    return this.sensorsService.searchSensorData(sensorSearchDTO);
  }
}

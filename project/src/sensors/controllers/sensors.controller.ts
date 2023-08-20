import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SensorsService } from '../services/sensors.service';
import { UploadSensorDTO } from '../dto/upload-sensor.dto';
import { Sensor } from '../entities/sensor.entity';
import { SensorSearchDTO } from '../dto/search-sensor.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Sensors')
@Controller('sensors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('upload')
  @ApiResponse({ type: Sensor })
  @ApiOperation({
    description: 'Upload the sensor data. You can try it at swagger',
  })
  async uploadSensorData(
    @Body() uploadSensorDTO: UploadSensorDTO,
  ): Promise<Sensor> {
    return this.sensorsService.uploadSensorData(uploadSensorDTO);
  }

  @Get('search')
  @ApiResponse({ type: [Sensor] })
  @ApiOperation({
    description: `Search the sensor data. 
    You cant try it at swagger, due to nestjs swagger is working with OAS 3.0 
    and to do a get body it needs with OAS 3.1.`,
  })
  async searchSensorData(
    @Body() sensorSearchDTO: SensorSearchDTO,
  ): Promise<Sensor[]> {
    return this.sensorsService.searchSensorData(sensorSearchDTO);
  }
}

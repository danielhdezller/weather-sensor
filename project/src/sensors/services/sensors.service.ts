import { Injectable } from '@nestjs/common';
import { UploadSensorDto } from '../dto/upload-sensor.dto';
import { SensorRepository } from '../repositories/sensors.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorRepository)
    private readonly sensorRepository: SensorRepository,
  ) {}

  async uploadSensorData(uploadSensorDto: UploadSensorDto) {
    return this.sensorRepository.uploadSensorData(uploadSensorDto);
  }
}

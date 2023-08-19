import { Injectable } from '@nestjs/common';
import { UploadSensorDTO } from '../dto/upload-sensor.dto';
import { SensorRepository } from '../repositories/sensors.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorSearchDTO } from '../dto/search-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorRepository)
    private readonly sensorRepository: SensorRepository,
  ) {}

  async uploadSensorData(uploadSensorDTO: UploadSensorDTO) {
    return this.sensorRepository.uploadSensorData(uploadSensorDTO);
  }

  async searchSensorData(sensorSearchDTO: SensorSearchDTO) {
    return this.sensorRepository.searchSensorData(sensorSearchDTO);
  }
}

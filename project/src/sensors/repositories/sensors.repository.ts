import { DataSource, Repository } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';
import { UploadSensorDto } from '../dto/upload-sensor.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SensorRepository extends Repository<Sensor> {
  constructor(private dataSource: DataSource) {
    super(Sensor, dataSource.createEntityManager());
  }

  async uploadSensorData(uploadSensorDto: UploadSensorDto): Promise<Sensor> {
    const sensor = this.create(uploadSensorDto);
    sensor.timestamp = new Date(sensor.timestamp);
    return this.save(sensor);
  }
}

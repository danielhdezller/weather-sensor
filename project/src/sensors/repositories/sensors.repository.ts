import { DataSource, Repository } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';
import { UploadSensorDTO } from '../dto/upload-sensor.dto';
import { Injectable } from '@nestjs/common';
import { SensorSearchDTO } from '../dto/search-sensor.dto';

@Injectable()
export class SensorRepository extends Repository<Sensor> {
  constructor(private dataSource: DataSource) {
    super(Sensor, dataSource.createEntityManager());
  }

  async uploadSensorData(uploadSensorDto: UploadSensorDTO): Promise<Sensor> {
    const sensor = this.create(uploadSensorDto);
    sensor.timestamp = new Date(sensor.timestamp);
    return this.save(sensor);
  }

  async searchSensorData(sensorSearchDTO: SensorSearchDTO): Promise<Sensor[]> {
    const { filters, sort, aggregate } = sensorSearchDTO;

    const query = this.createQueryBuilder('sensor');

    // Applying filters
    if (filters) {
      for (const column in filters) {
        if (filters.hasOwnProperty(column)) {
          const filterValue = filters[column];
          if (typeof filterValue === 'object') {
            const operator = Object.keys(filterValue)[0];
            const value = filterValue[operator];
            if (operator === 'eq') {
              query.andWhere(`sensor.${column} = :${column}`, {
                [column]: value,
              });
            } else if (operator === 'gte') {
              query.andWhere(`sensor.${column} >= :${column}`, {
                [column]: value,
              });
            } else if (operator === 'lte') {
              query.andWhere(`sensor.${column} <= :${column}`, {
                [column]: value,
              });
            }
          }
        }
      }
    }

    // Applying sorting
    if (sort) {
      const order = sort.order === 'descending' ? 'DESC' : 'ASC';
      query.orderBy(`sensor.${sort.column}`, order);
    }

    // Applying aggregation
    if (aggregate) {
      const aggregateFunc = aggregate.operator.toUpperCase();
      if (
        (aggregate.column == 'visibility' && aggregateFunc === 'SUM') ||
        aggregateFunc === 'MAX' ||
        aggregateFunc === 'MIN' ||
        aggregate.column == 'timestamp'
      ) {
        return query.getRawMany();
      } else {
        query.addSelect(
          `${aggregateFunc}(sensor.${aggregate.column})`,
          'aggregateResult',
        );
        query.groupBy(`sensor.id`);
      }
    }

    return query.getRawMany();
  }
}

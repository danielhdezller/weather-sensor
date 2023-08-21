import { Injectable } from '@nestjs/common';
import { castAndValidate } from 'src/shared/transform-to-dto';
import { SensorSearchResponseDTO } from '../dto/search-sensor-response';
import { VisibilityEnum } from '../entities/sensor.entity';

export interface RawSensorInterface {
  id: number;
  sensor_humidity: number;
  sensor_rainfall: number;
  sensor_timestamp: Date;
  sensor_wind_speed: number;
  sensor_visibility: VisibilityEnum;
  sensor_temperature: number;
  aggregateResult: string;
}

@Injectable()
export class SensorsMapperService {
  public async rawSensorToSensorSearchResponseDTO(
    rawSensor: RawSensorInterface,
  ): Promise<SensorSearchResponseDTO> {
    const sensorSearchResponseDTO = new SensorSearchResponseDTO();
    sensorSearchResponseDTO.id = rawSensor.id;
    sensorSearchResponseDTO.humidity = rawSensor.sensor_humidity;
    sensorSearchResponseDTO.rainfall = rawSensor.sensor_rainfall;
    sensorSearchResponseDTO.timestamp = rawSensor.sensor_timestamp;
    sensorSearchResponseDTO.windSpeed = rawSensor.sensor_wind_speed;
    sensorSearchResponseDTO.visibility = rawSensor.sensor_visibility;
    sensorSearchResponseDTO.temperature = rawSensor.sensor_temperature;
    sensorSearchResponseDTO.aggregateResult = rawSensor.aggregateResult;

    return castAndValidate(SensorSearchResponseDTO, sensorSearchResponseDTO);
  }

  public async rawSensorsToSensorsSearchResponseDTO(
    rawSensors: RawSensorInterface[],
  ): Promise<SensorSearchResponseDTO[]> {
    if (!rawSensors) {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sensorSearchResponseDTO: any[] = [];
    for (const rawSensor of rawSensors) {
      sensorSearchResponseDTO.push(
        await this.rawSensorToSensorSearchResponseDTO(rawSensor),
      );
    }

    return sensorSearchResponseDTO;
  }
}

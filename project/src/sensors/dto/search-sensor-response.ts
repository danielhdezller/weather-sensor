import { PickType } from '@nestjs/swagger';
import { Sensor } from '../entities/sensor.entity';
import { DtoProperty } from 'src/shared/dto-property';
import { IsDate, IsString } from 'class-validator';

export class SensorSearchResponseDTO extends PickType(Sensor, [
  'id',
  'humidity',
  'rainfall',
  'temperature',
  'visibility',
  'windSpeed',
] as const) {
  @DtoProperty()
  @IsDate()
  timestamp: Date;

  @DtoProperty()
  @IsString()
  aggregateResult: string;
}

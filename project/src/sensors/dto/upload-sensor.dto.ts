import { PickType } from '@nestjs/mapped-types';
import { Sensor } from '../entities/sensor.entity';
import { DtoProperty } from 'src/shared/dto-property';
import { IsInt } from 'class-validator';

export class UploadSensorDTO extends PickType(Sensor, [
  'humidity',
  'rainfall',
  'temperature',
  'visibility',
  'windSpeed',
]) {
  @DtoProperty({
    example: 1690967790,
    description: 'An epoch timestamp, in seconds.',
  })
  @IsInt()
  timestamp: number;
}

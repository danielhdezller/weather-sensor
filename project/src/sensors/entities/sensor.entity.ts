import { IsDate, IsEnum, IsInt, IsNumber } from 'class-validator';
import { DtoProperty } from 'src/shared/dto-property';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum VisibilityEnum {
  VP = 'VP',
  P = 'P',
  M = 'M',
  G = 'G',
  VG = 'VG',
  E = 'E',
}

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  @DtoProperty()
  id: number;

  @Column({ type: 'timestamp' })
  @DtoProperty({ example: '2021-08-20T12:00:00.000Z', description: 'ISO 8601' })
  @IsDate()
  timestamp: Date;

  @Column({ type: 'float' })
  @DtoProperty({ example: 14.1, description: 'In Celsius.' })
  @IsNumber()
  temperature: number;

  @Column({ type: 'float' })
  @DtoProperty({ example: 6.11, description: 'In mm.' })
  @IsNumber()
  rainfall: number;

  @Column({ type: 'int' })
  @DtoProperty({ example: 20, description: 'In %.' })
  @IsNumber()
  humidity: number;

  @Column({ type: 'int', name: 'wind_speed' })
  @DtoProperty({ example: 10, description: 'In mph.' })
  @IsInt()
  windSpeed: number;

  @Column({ type: 'enum', enum: VisibilityEnum })
  @DtoProperty({
    type: 'enum',
    enum: VisibilityEnum,
    example: VisibilityEnum.VP,
    description: 'Very poor (VP) to excellent (E).',
  })
  @IsEnum(VisibilityEnum)
  visibility: VisibilityEnum;
}

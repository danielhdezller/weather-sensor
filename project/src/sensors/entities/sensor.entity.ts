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
  id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'float' })
  rainfall: number;

  @Column({ type: 'int' })
  humidity: number;

  @Column({ type: 'int', name: 'wind_speed' })
  windSpeed: number;

  @Column({ type: 'enum', enum: VisibilityEnum })
  visibility: VisibilityEnum;
}

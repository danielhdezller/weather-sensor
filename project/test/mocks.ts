import { faker } from '@faker-js/faker';
import { UploadSensorDTO } from 'src/sensors/dto/upload-sensor.dto';
import { VisibilityEnum } from 'src/sensors/entities/sensor.entity';

export const fakeSensor = (data?: UploadSensorDTO) => {
  return {
    timestamp: new Date(data.timestamp || 1690967790),
    temperature: data.temperature || faker.number.float({ max: 100 }),
    rainfall: data.rainfall || faker.number.float({ max: 100 }),
    humidity: data.humidity || faker.number.int({ max: 100 }),
    windSpeed: data.windSpeed || faker.number.int({ max: 100 }),
    visibility:
      data.visibility ||
      faker.helpers.arrayElement(Object.values(VisibilityEnum)),
  };
};

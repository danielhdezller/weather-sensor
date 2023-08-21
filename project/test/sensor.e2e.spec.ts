import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import createTestApp from './createTestApp';
import { UserAuthServiceMock } from './user-auth-service.mock';
import { Repository } from 'typeorm';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { fakeSensor } from './mocks';
import { UploadSensorDTO } from 'src/sensors/dto/upload-sensor.dto';
import testsDataSource from 'src/typeorm/test-ormconfig';
import {
  AggregationOperatorEnum,
  SensorSearchDTO,
  SortOrderEnum,
} from 'src/sensors/dto/search-sensor.dto';

describe('Sensor controller (e2e)', () => {
  let testApp: INestApplication;
  let authenticateUserToken: string;
  let userAuthServiceMock: UserAuthServiceMock;
  let sensorRepository: Repository<Sensor>;
  const highestTemperature = 25.1;

  beforeAll(async () => {
    const { moduleRef, app } = await createTestApp({
      additionalModules: [],
    });
    testApp = app;
    userAuthServiceMock = await moduleRef.resolve(UserAuthServiceMock);
    authenticateUserToken =
      await userAuthServiceMock.getAuthenticateUserToken();

    sensorRepository = await testsDataSource
      .initialize()
      .then((dataSource) => dataSource.getRepository(Sensor));
  });

  afterAll(async () => {
    await sensorRepository.delete({});
    testsDataSource.destroy();
    await testApp.close();
  });

  it('/ (POST) Sensor upload, should upload a new sensor data.', async () => {
    const newSensorBody = {
      timestamp: 1690967790,
      temperature: highestTemperature,
      rainfall: 6.11,
      humidity: 20,
      windSpeed: 23,
      visibility: 'VP',
    };
    const response = await request(testApp.getHttpServer())
      .post('/api/sensors/upload')
      .send(newSensorBody)
      .auth(authenticateUserToken, { type: 'bearer' })
      .expect(201);

    expect(response.body.visibility).toBe(newSensorBody.visibility);
  });

  it('/ (GET) Sensor search, filters eq should return only one sensor.', async () => {
    const uploadSensorDTO = new UploadSensorDTO();
    uploadSensorDTO.temperature = 20;
    const fakedSensor = sensorRepository.create(fakeSensor(uploadSensorDTO));
    await sensorRepository.save(fakedSensor);

    const querySensorBody: SensorSearchDTO = {
      filters: {
        temperature: { eq: highestTemperature },
      },
      sort: {
        column: 'temperature',
        order: SortOrderEnum.DESCENDING,
      },
      aggregate: {
        column: 'humidity',
        operator: AggregationOperatorEnum.SUM,
      },
    };
    const response = await request(testApp.getHttpServer())
      .get('/api/sensors/search')
      .send(querySensorBody)
      .auth(authenticateUserToken, { type: 'bearer' })
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].sensor_temperature).toBe(
      querySensorBody.filters.temperature.eq,
    );
  });

  it('/ (GET) Sensor search, filters by lte and  should order the sensor data ascending.', async () => {
    const lowestTemperature = 19;
    const uploadSensorDTO = new UploadSensorDTO();
    uploadSensorDTO.temperature = lowestTemperature;
    const fakedSensor = sensorRepository.create(fakeSensor(uploadSensorDTO));
    await sensorRepository.save(fakedSensor);

    const querySensorBody: SensorSearchDTO = {
      filters: {
        temperature: { lte: highestTemperature },
      },
      sort: {
        column: 'temperature',
        order: SortOrderEnum.ASCENDING,
      },
      aggregate: {
        column: 'humidity',
        operator: AggregationOperatorEnum.SUM,
      },
    };
    const response = await request(testApp.getHttpServer())
      .get('/api/sensors/search')
      .send(querySensorBody)
      .auth(authenticateUserToken, { type: 'bearer' })
      .expect(200);
    //Its considering the 3 Sensor data created during the e2e test for Sensor.
    expect(response.body.length).toBe(3);
    expect(response.body[0].sensor_temperature).toBe(lowestTemperature);
  });
});

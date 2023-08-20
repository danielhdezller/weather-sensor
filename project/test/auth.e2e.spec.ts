import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import createTestApp from './createTestApp';
import { Users } from 'src/users/services/users.service';

describe('Auth controller (e2e)', () => {
  let testApp: INestApplication;

  beforeAll(async () => {
    const { app } = await createTestApp({
      additionalModules: [],
    });
    testApp = app;
  });

  afterAll(async () => {
    await testApp.close();
  });

  it('/ (POST) Auth login, should return access_token.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .send({ email: Users[0].email, password: Users[0].password })
      .expect(201);

    expect(response.body.access_token.length).toBeGreaterThan(1);
  });

  it('/ (POST) Auth login, should return 422 status code, Unprocessable Entity without body.', async () => {
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .expect(422);

    expect(response.body.error).toBe('Unprocessable Entity');
  });

  it('/ (POST) Auth login, should return 401 status code, Unauthorized, when user not found in DB.', async () => {
    const wrongEmail = 'wrong.email@mail.com';
    const response = await request(testApp.getHttpServer())
      .post('/api/auth/login')
      .send({ email: wrongEmail, password: Users[0].password })
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });
});

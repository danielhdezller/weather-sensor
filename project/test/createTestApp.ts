import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configureDefaultValidationPipes } from 'src/app-bootstrap/routing.bootstrap';
import { SensorsModule } from 'src/sensors/sensors.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserAuthServiceMock } from './user-auth-service.mock';
import { jestDataSourceOptions } from 'src/typeorm/test-ormconfig';

const init = async ({ additionalModules = [] }) => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot(jestDataSourceOptions),
      AuthModule,
      UsersModule,
      SensorsModule,
      ...additionalModules,
    ],
    providers: [UserAuthServiceMock],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  configureDefaultValidationPipes(app);

  await app.init();

  return {
    moduleRef,
    app,
  };
};

export default init;

import { TypeOrmModule } from '@nestjs/typeorm';
import { jestDataSourceOptions } from '../src/typeorm/ormconfig';
import { Test } from '@nestjs/testing';
import { configureDefaultValidationPipes } from 'src/app-bootstrap/routing.bootstrap';
import { SensorsModule } from 'src/sensors/sensors.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

const init = async ({ additionalModules = [] }) => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      AuthModule,
      UsersModule,
      SensorsModule,
      TypeOrmModule.forRoot(jestDataSourceOptions),
      ...additionalModules,
    ],
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

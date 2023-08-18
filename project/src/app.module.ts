import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SensorsModule } from './sensors/sensors.module';
import { dataSourceOptions } from './typeorm/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

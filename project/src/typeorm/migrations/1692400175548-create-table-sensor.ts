import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSensor1692400175548 implements MigrationInterface {
  name = 'CreateTableSensor1692400175548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sensor_visibility_enum" AS ENUM('VP', 'P', 'M', 'G', 'VG', 'E')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sensor" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "temperature" double precision NOT NULL, "rainfall" double precision NOT NULL, "humidity" integer NOT NULL, "wind_speed" integer NOT NULL, "visibility" "public"."sensor_visibility_enum" NOT NULL, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sensor"`);
    await queryRunner.query(`DROP TYPE "public"."sensor_visibility_enum"`);
  }
}

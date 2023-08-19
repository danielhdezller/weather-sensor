import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureDocumentationGenerator } from './app-bootstrap/swagger.bootstrap';
import { configureDefaultValidationPipes } from './app-bootstrap/routing.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureDefaultValidationPipes(app);
  configureDocumentationGenerator(app, 'docs');
  await app.listen(3000);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configure a INestApplication to use a document generator (swagger right now).
 *
 * @param {INestApplication} app The app where the document builder will be configured.
 */
export function configureDocumentationGenerator(
  app: INestApplication,
  path: string,
): void {
  const swaggerPaths = [
    path,
    // Add a second swagger path with that reference to the best tv show.
    'docs',
  ];

  // Extract a list of paths that will be protected.
  const pathWithCredentials: string[] = [];

  swaggerPaths.forEach((path) =>
    pathWithCredentials.push(`/${path}`, `/${path}-json`),
  );

  // Configure the list of documents path`
  swaggerPaths.forEach((path) => {
    const options = new DocumentBuilder()
      .setTitle('Weather')
      .setDescription('RestFul API that upload sensor data and search it.')
      .setContact(
        'Weather',
        'https://github.com/danielhdezllera',
        'dhdezllerena94@gmail.com',
      )
      .setVersion('1')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path, app, document);
  });
}

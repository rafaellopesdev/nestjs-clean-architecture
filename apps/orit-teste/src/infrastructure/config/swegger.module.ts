import { Module } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static configure(app: INestApplication) {
    const configService = app.get<ConfigService>(ConfigService);

    const apiTitle = configService.get<string>('API_TITLE');
    const apiVersion = configService.get<string>('API_VERSION');
    const apiServer = configService.get<string>('API_SERVER');

    const config = new DocumentBuilder()
      .setTitle(apiTitle)
      .setVersion(apiVersion)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiServer, app, document);
  }
}

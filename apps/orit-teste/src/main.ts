import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './infrastructure/config/swegger.module';
import { ResponseInterceptor } from './infrastructure/utils/interceptors/response-interceptor.util';
import { ExceptionInterceptor } from './infrastructure/utils/interceptors/exception-interceptor.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ExceptionInterceptor());

  SwaggerConfigModule.configure(app);

  await app.listen(3000);
}
bootstrap();

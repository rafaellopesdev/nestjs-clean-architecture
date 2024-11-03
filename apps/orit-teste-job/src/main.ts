import { NestFactory } from '@nestjs/core';
import { OritTesteJobModule } from './orit-teste-job.module';

async function bootstrap() {
  const app = await NestFactory.create(OritTesteJobModule);
  await app.listen(3001);
}
bootstrap();

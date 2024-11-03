import { Module } from '@nestjs/common';
import { TaskModule } from './presentation/api/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/config/database.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    DatabaseModule,
    TaskModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CompletedTaskUseCase } from '../../../application/use-cases/task/completed-task.use-case';
import { CreateTaskUseCase } from '../../../application/use-cases/task/create-task.use-case';
import { DeleteTaskUseCase } from '../../../application/use-cases/task/delete-task.use-case';
import { ListAllTaskUseCase } from '../../../application/use-cases/task/list-all-task.use-case';
import { DatabaseModule } from '../../../infrastructure/config/database.module';
import { BullMQMessaging } from '../../../infrastructure/messaging/bullmq/bullmq.messaging';
import { TaskTypeOrmRepository } from '../../../infrastructure/persistence/typeorm/repositories/task/task-typeorm.repository';
import { TaskController } from './task.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'JOB_NOTIFICATIONS',
    }),
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: BullMQMessaging,
      useClass: BullMQMessaging,
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (repository: TaskTypeOrmRepository) =>
        new CreateTaskUseCase(repository),
      inject: [TaskTypeOrmRepository],
    },
    {
      provide: CompletedTaskUseCase,
      useFactory: (
        repository: TaskTypeOrmRepository,
        messaging: BullMQMessaging,
      ) => new CompletedTaskUseCase(repository, messaging),
      inject: [TaskTypeOrmRepository, BullMQMessaging],
    },
    {
      provide: ListAllTaskUseCase,
      useFactory: (repository: TaskTypeOrmRepository) =>
        new ListAllTaskUseCase(repository),
      inject: [TaskTypeOrmRepository],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (repository: TaskTypeOrmRepository) =>
        new DeleteTaskUseCase(repository),
      inject: [TaskTypeOrmRepository],
    },
  ],
})
export class TaskModule {}

import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { SendMailForCompletedTaskUseCase } from './use-cases/sendmail-for-completed-task.use-case';
import { SendMailForCompletedTaskTemplate } from './templates/sendmail-for-completed-task.template';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'JOB_NOTIFICATIONS',
    }),
  ],
  providers: [
    NotificationService,
    SendMailForCompletedTaskUseCase,
    SendMailForCompletedTaskTemplate,
  ],
})
export class NotificationModule {}

import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { SendMailForCompletedTaskUseCase } from './use-cases/sendmail-for-completed-task.use-case';

@Processor('JOB_NOTIFICATIONS')
export class NotificationService extends WorkerHost {
  constructor(
    @InjectQueue('JOB_NOTIFICATIONS') private readonly jobQueue: Queue,
    private sendMailForCompletedTaskUseCase: SendMailForCompletedTaskUseCase,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    try {
      console.log(`Processando a mensagem ${job.name} com ID: ${job.id}`);

      switch (job.name) {
        case 'TASK_COMPLETED': {
          await this.sendMailForCompletedTaskUseCase.execute(job.data);
          break;
        }
        default:
          console.log(`Job desconhecido: ${job.name}`);
      }
    } catch (error) {
      console.error(
        `Erro ao processar a mensagem ${job.name} ID: ${job.id} ERRO: ${error.message}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.jobQueue.add(job.name, job.data);
      console.log('Mensagem reenviada para fila!');
    }
  }
}

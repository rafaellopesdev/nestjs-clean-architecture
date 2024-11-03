import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { IBullMqMessaging } from '../../../infrastructure/messaging/bullmq/interfaces/bullmq.interface';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';

export class CompletedTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly bullMQMessaging: IBullMqMessaging,
  ) {}

  async execute(id: number) {
    await this.checkIdBelongsToTask(id);
    const response = await this.taskRepository.setTaskAsCompleted(id);

    if (response) {
      await this.sendNotification(id);
      return { message: 'Parabéns! Tarefa concluida com sucesso.' };
    }

    throw new ExceptionInUseCase(
      'Não foi possível concluir a tarefa solicitada.',
    );
  }

  private async sendNotification(id: number) {
    const result = await this.taskRepository.findById(id);

    await this.bullMQMessaging.sendMessage('TASK_COMPLETED', {
      taskId: id,
      title: result.title,
      description: result.description,
      authorEmail: result.authorEmail,
    });
  }

  private async checkIdBelongsToTask(id: number) {
    const data = await this.taskRepository.findById(id);

    if (!data) {
      throw new ExceptionInUseCase(
        'Não foi possível localizar o ID da tarefa informada.',
      );
    }
  }
}

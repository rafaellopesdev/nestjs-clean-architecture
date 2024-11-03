import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: number) {
    await this.checkIdBelongsToTask(id);
    await this.taskRepository.delete(id);

    return { message: 'Parabéns! Tarefa excluída com sucesso.' };
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

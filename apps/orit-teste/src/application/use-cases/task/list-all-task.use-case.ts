import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';

export class ListAllTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute() {
    const listing = await this.taskRepository.findAll();

    if (listing.length === 0) {
      throw new ExceptionInUseCase(
        'Ops, nenhuma tarefa foi encontrada para listar.',
      );
    }

    return {
      message: 'Listagem com as tarefas.',
      content: listing,
    };
  }
}

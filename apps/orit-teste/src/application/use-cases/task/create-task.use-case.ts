import { TaskEntity } from '../../../domain/entities/task/task.entity';
import { ITaskRepository } from '../../../domain/repositories/task/task.repository';

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(params: TaskEntity) {
    const response = await this.taskRepository.save(params);
    return {
      message: 'Parabéns! Tarefa criada com sucesso.',
      content: [response],
    };
  }
}

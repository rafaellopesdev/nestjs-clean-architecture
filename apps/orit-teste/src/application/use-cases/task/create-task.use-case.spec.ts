import { TaskEntity } from '../../../domain/entities/task/task.entity';
import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { CreateTaskUseCase } from './create-task.use-case';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      setTaskAsCompleted: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as ITaskRepository;

    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it('should create a new task successfully', async () => {
    const task: TaskEntity = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
    };

    (taskRepository.save as jest.Mock).mockResolvedValue(task);

    const result = await createTaskUseCase.execute(task);

    expect(result).toEqual({
      message: 'Parabéns! Tarefa criada com sucesso.',
      content: [task],
    });
    expect(taskRepository.save).toHaveBeenCalledWith(task);
  });

  it('should handle errors if saving a task fails', async () => {
    const task: TaskEntity = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
    };

    (taskRepository.save as jest.Mock).mockRejectedValue(
      new Error('Error saving task'),
    );

    await expect(createTaskUseCase.execute(task)).rejects.toThrow(
      'Error saving task',
    );
  });
});

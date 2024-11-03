import { TaskEntity } from '../../../domain/entities/task/task.entity';
import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';
import { ListAllTaskUseCase } from './list-all-task.use-case';

describe('ListAllTaskUseCase', () => {
  let listAllTaskUseCase: ListAllTaskUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      setTaskAsCompleted: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as ITaskRepository;

    listAllTaskUseCase = new ListAllTaskUseCase(taskRepository);
  });

  it('should return a list of tasks successfully', async () => {
    const tasks: TaskEntity[] = [
      {
        id: 3,
        title: 'Criar texto Lorem Ipsum',
        description:
          'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
        author: 'Jorge Henrique',
        authorEmail: 'jorgehenrique@exemplo.com',
        isCompleted: 1,
      },
    ];

    (taskRepository.findAll as jest.Mock).mockResolvedValue(tasks);

    const result = await listAllTaskUseCase.execute();

    expect(result).toEqual({
      message: 'Listagem com as tarefas.',
      content: tasks,
    });
    expect(taskRepository.findAll).toHaveBeenCalled();
  });

  it('should throw an exception if no tasks are found', async () => {
    (taskRepository.findAll as jest.Mock).mockResolvedValue([]);

    await expect(listAllTaskUseCase.execute()).rejects.toThrow(
      ExceptionInUseCase,
    );
    await expect(listAllTaskUseCase.execute()).rejects.toThrow(
      'Ops, nenhuma tarefa foi encontrada para listar.',
    );
    expect(taskRepository.findAll).toHaveBeenCalled();
  });
});

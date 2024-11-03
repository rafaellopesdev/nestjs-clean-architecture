import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';
import { DeleteTaskUseCase } from './delete-task.use-case';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      setTaskAsCompleted: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as ITaskRepository;

    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  });

  it('should delete a task successfully', async () => {
    const id = 3;
    const task = {
      id,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
      isCompleted: 1,
    };

    (taskRepository.findById as jest.Mock).mockResolvedValue(task);
    (taskRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await deleteTaskUseCase.execute(id);

    expect(result).toEqual({
      message: 'Parabéns! Tarefa excluída com sucesso.',
    });
    expect(taskRepository.findById).toHaveBeenCalledWith(id);
    expect(taskRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an exception if the task ID does not exist', async () => {
    const id = 999;

    (taskRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteTaskUseCase.execute(id)).rejects.toThrow(
      ExceptionInUseCase,
    );
    await expect(deleteTaskUseCase.execute(id)).rejects.toThrow(
      'Não foi possível localizar o ID da tarefa informada.',
    );
    expect(taskRepository.findById).toHaveBeenCalledWith(id);
    expect(taskRepository.delete).not.toHaveBeenCalled();
  });
});

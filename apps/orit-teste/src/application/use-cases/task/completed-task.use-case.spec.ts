import { ITaskRepository } from '../../../domain/repositories/task/task.repository';
import { IBullMqMessaging } from '../../../infrastructure/messaging/bullmq/interfaces/bullmq.interface';
import { ExceptionInUseCase } from '../../../infrastructure/utils/exception/exeption-in-use-case.exception';
import { CompletedTaskUseCase } from './completed-task.use-case';

describe('CompletedTaskUseCase', () => {
  let completedTaskUseCase: CompletedTaskUseCase;
  let taskRepository: ITaskRepository;
  let bullMQMessaging: IBullMqMessaging;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      setTaskAsCompleted: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as ITaskRepository;

    bullMQMessaging = {
      sendMessage: jest.fn(),
    } as unknown as IBullMqMessaging;

    completedTaskUseCase = new CompletedTaskUseCase(
      taskRepository,
      bullMQMessaging,
    );
  });

  it('should complete a task and send a notification', async () => {
    const id = 3;
    const task = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
      isCompleted: 1,
    };

    (taskRepository.findById as jest.Mock).mockResolvedValue(task);
    (taskRepository.setTaskAsCompleted as jest.Mock).mockResolvedValue(true);

    const result = await completedTaskUseCase.execute(id);
    expect(result).toEqual({
      message: 'Parabéns! Tarefa concluida com sucesso.',
    });
    expect(taskRepository.setTaskAsCompleted).toHaveBeenCalledWith(id);
    expect(bullMQMessaging.sendMessage).toHaveBeenCalledWith('TASK_COMPLETED', {
      taskId: id,
      title: task.title,
      description: task.description,
      authorEmail: task.authorEmail,
    });
  });

  it('should throw an exception if the task ID does not exist', async () => {
    const id = 999;

    (taskRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(completedTaskUseCase.execute(id)).rejects.toThrow(
      ExceptionInUseCase,
    );
    await expect(completedTaskUseCase.execute(id)).rejects.toThrow(
      'Não foi possível localizar o ID da tarefa informada.',
    );
  });

  it('should throw an exception if the task could not be completed', async () => {
    const id = 3;
    const task = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
      isCompleted: 1,
    };

    (taskRepository.findById as jest.Mock).mockResolvedValue(task);
    (taskRepository.setTaskAsCompleted as jest.Mock).mockResolvedValue(false);

    await expect(completedTaskUseCase.execute(id)).rejects.toThrow(
      ExceptionInUseCase,
    );
    await expect(completedTaskUseCase.execute(id)).rejects.toThrow(
      'Não foi possível concluir a tarefa solicitada.',
    );
  });
});

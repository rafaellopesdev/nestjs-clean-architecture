import { TaskEntity } from '../../entities/task/task.entity';
import { ITaskRepository } from './task.repository';

describe('ITaskRepository', () => {
  let taskRepository: ITaskRepository;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      setTaskAsCompleted: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as unknown as ITaskRepository;
  });

  it('should save a task', async () => {
    const task: TaskEntity = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
      isCompleted: 1,
    };

    (taskRepository.save as jest.Mock).mockResolvedValue(task);

    const savedTask = await taskRepository.save(task);
    expect(savedTask).toEqual(task);
    expect(taskRepository.save).toHaveBeenCalledWith(task);
  });

  it('should set a task as completed', async () => {
    const id = 3;
    (taskRepository.setTaskAsCompleted as jest.Mock).mockResolvedValue(true);

    const result = await taskRepository.setTaskAsCompleted(id);
    expect(result).toBe(true);
    expect(taskRepository.setTaskAsCompleted).toHaveBeenCalledWith(id);
  });

  it('should delete a task', () => {
    const id = 3;
    (taskRepository.delete as jest.Mock).mockImplementation(() => {});

    taskRepository.delete(id);
    expect(taskRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should find a task by id', async () => {
    const task: TaskEntity = {
      id: 3,
      title: 'Criar texto Lorem Ipsum',
      description:
        'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
      author: 'Jorge Henrique',
      authorEmail: 'jorgehenrique@exemplo.com',
      isCompleted: 1,
    };

    (taskRepository.findById as jest.Mock).mockResolvedValue(task);

    const foundTask = await taskRepository.findById(3);
    expect(foundTask).toEqual(task);
    expect(taskRepository.findById).toHaveBeenCalledWith(3);
  });

  it('should find all tasks', async () => {
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

    const allTasks = await taskRepository.findAll();
    expect(allTasks).toEqual(tasks);
    expect(taskRepository.findAll).toHaveBeenCalled();
  });
});

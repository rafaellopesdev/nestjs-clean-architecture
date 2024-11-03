import { TestingModule, Test } from '@nestjs/testing';
import { CompletedTaskUseCase } from '../../../application/use-cases/task/completed-task.use-case';
import { CreateTaskUseCase } from '../../../application/use-cases/task/create-task.use-case';
import { DeleteTaskUseCase } from '../../../application/use-cases/task/delete-task.use-case';
import { ListAllTaskUseCase } from '../../../application/use-cases/task/list-all-task.use-case';
import { CompletedTaskDto } from './dtos/completed-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { DeleteTaskDto } from './dtos/delete-task.dto';
import { TaskController } from './task.controller';

describe('TaskController', () => {
  let controller: TaskController;
  let createTaskUseCase: CreateTaskUseCase;
  let completedTaskUseCase: CompletedTaskUseCase;
  let listAllTaskUseCase: ListAllTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CreateTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CompletedTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListAllTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteTaskUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    completedTaskUseCase =
      module.get<CompletedTaskUseCase>(CompletedTaskUseCase);
    listAllTaskUseCase = module.get<ListAllTaskUseCase>(ListAllTaskUseCase);
    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call createTaskUseCase.execute with correct params', async () => {
      const createTaskDto = new CreateTaskDto();
      await controller.create(createTaskDto);
      expect(createTaskUseCase.execute).toHaveBeenCalledTimes(1);
      expect(createTaskUseCase.execute).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('completed', () => {
    it('should call completedTaskUseCase.execute with correct params', async () => {
      const completedTaskDto = new CompletedTaskDto();
      completedTaskDto.id = 1;
      await controller.completed(completedTaskDto);
      expect(completedTaskUseCase.execute).toHaveBeenCalledTimes(1);
      expect(completedTaskUseCase.execute).toHaveBeenCalledWith(
        completedTaskDto.id,
      );
    });
  });

  describe('listAll', () => {
    it('should call listAllTaskUseCase.execute', async () => {
      await controller.listAll();
      expect(listAllTaskUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call deleteTaskUseCase.execute with correct params', async () => {
      const deleteTaskDto = new DeleteTaskDto();
      deleteTaskDto.id = 1;
      await controller.delete(deleteTaskDto);
      expect(deleteTaskUseCase.execute).toHaveBeenCalledTimes(1);
      expect(deleteTaskUseCase.execute).toHaveBeenCalledWith(deleteTaskDto.id);
    });
  });
});

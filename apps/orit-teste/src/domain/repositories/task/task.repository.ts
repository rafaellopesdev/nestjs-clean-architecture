import { TaskEntity } from '../../entities/task/task.entity';

export interface ITaskRepository {
  save(task: TaskEntity): Promise<TaskEntity>;
  setTaskAsCompleted(id: number): Promise<boolean>;
  delete(id: number);
  findById(id: number): Promise<TaskEntity>;
  findAll(): Promise<TaskEntity[]>;
}

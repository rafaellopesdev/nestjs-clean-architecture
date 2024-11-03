import { TaskEntity } from '../../../../../domain/entities/task/task.entity';
import { ITaskRepository } from '../../../../../domain/repositories/task/task.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTypeOrmEntity } from '../../entities/task/task-typeorm.entity';

@Injectable()
export class TaskTypeOrmRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrmEntity)
    private readonly taskTypeOrmRepository: Repository<TaskTypeOrmEntity>,
  ) {}

  async save(task: TaskEntity): Promise<TaskEntity> {
    const result = await this.taskTypeOrmRepository.save(task);
    const taskToEntity: TaskEntity = {
      id: result.id,
      title: result.title,
      description: result.description,
      author: result.author,
      authorEmail: result.authorEmail,
    };
    return taskToEntity;
  }

  async setTaskAsCompleted(id: number): Promise<boolean> {
    const queryRunner =
      await this.taskTypeOrmRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.taskTypeOrmRepository.update({ id }, { isCompleted: 1 });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number) {
    await this.taskTypeOrmRepository.delete(id);
  }

  async findById(id: number): Promise<TaskEntity> {
    const taskTypeOrmEntity = await this.taskTypeOrmRepository.findOne({
      where: { id },
    });

    if (!taskTypeOrmEntity) {
      return null;
    }

    return taskTypeOrmEntity;
  }

  async findAll(): Promise<TaskEntity[]> {
    const taskTypeOrmEntities = await this.taskTypeOrmRepository.find();
    return taskTypeOrmEntities;
  }
}

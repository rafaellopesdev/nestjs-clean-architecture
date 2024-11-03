import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../persistence/typeorm/config/typeorm.config';
import { TaskTypeOrmEntity } from '../persistence/typeorm/entities/task/task-typeorm.entity';
import { TaskTypeOrmRepository } from '../persistence/typeorm/repositories/task/task-typeorm.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([TaskTypeOrmEntity])],
  providers: [TaskTypeOrmRepository],
  exports: [TaskTypeOrmRepository],
})
export class DatabaseModule {}

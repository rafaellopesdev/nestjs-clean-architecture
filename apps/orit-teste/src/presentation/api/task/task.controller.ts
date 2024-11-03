import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ValidationPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompletedTaskUseCase } from '../../../application/use-cases/task/completed-task.use-case';
import { CreateTaskUseCase } from '../../../application/use-cases/task/create-task.use-case';
import { DeleteTaskUseCase } from '../../../application/use-cases/task/delete-task.use-case';
import { ListAllTaskUseCase } from '../../../application/use-cases/task/list-all-task.use-case';
import { CompletedTaskDto } from './dtos/completed-task.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { DeleteTaskDto } from './dtos/delete-task.dto';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly completedTaskUseCase: CompletedTaskUseCase,
    private readonly listAllTaskUseCase: ListAllTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post('/create')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.createTaskUseCase.execute(createTaskDto);
  }

  @Put('/completed/:id')
  async completed(
    @Param(new ValidationPipe()) completedTaskDto: CompletedTaskDto,
  ) {
    return this.completedTaskUseCase.execute(completedTaskDto.id);
  }

  @Get('/listAll')
  async listAll() {
    return await this.listAllTaskUseCase.execute();
  }

  @Delete('/delete/:id')
  async delete(@Param(new ValidationPipe()) deleteTaskDTO: DeleteTaskDto) {
    return await this.deleteTaskUseCase.execute(deleteTaskDTO.id);
  }
}

import { validate } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

describe('CreateTaskDto', () => {
  it('should be valid', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.title = 'Título da tarefa';
    createTaskDto.description = 'Descrição da tarefa';
    createTaskDto.author = 'Jorge Henrique';
    createTaskDto.authorEmail = 'jorgehenrique@exemplo.com';

    const errors = await validate(createTaskDto);
    expect(errors).toEqual([]);
  });

  it('should not be valid without title', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.description = 'Descrição da tarefa';
    createTaskDto.author = 'Jorge Henrique';
    createTaskDto.authorEmail = 'jorgehenrique@exemplo.com';

    const errors = await validate(createTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('title');
  });

  it('should not be valid without description', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.title = 'Título da tarefa';
    createTaskDto.author = 'Jorge Henrique';
    createTaskDto.authorEmail = 'jorgehenrique@exemplo.com';

    const errors = await validate(createTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('description');
  });

  it('should not be valid without author', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.title = 'Título da tarefa';
    createTaskDto.description = 'Descrição da tarefa';
    createTaskDto.authorEmail = 'jorgehenrique@exemplo.com';

    const errors = await validate(createTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('author');
  });

  it('should not be valid without authorEmail', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.title = 'Título da tarefa';
    createTaskDto.description = 'Descrição da tarefa';
    createTaskDto.author = 'Jorge Henrique';

    const errors = await validate(createTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('authorEmail');
  });

  it('should not be valid with invalid authorEmail', async () => {
    const createTaskDto = new CreateTaskDto();
    createTaskDto.title = 'Título da tarefa';
    createTaskDto.description = 'Descrição da tarefa';
    createTaskDto.author = 'Jorge Henrique';
    createTaskDto.authorEmail = 'invalid-email';

    const errors = await validate(createTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('authorEmail');
  });
});

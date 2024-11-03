import { validate } from 'class-validator';
import { CompletedTaskDto } from './completed-task.dto';

describe('CompletedTaskDto', () => {
  it('should be valid', async () => {
    const completedTaskDto = new CompletedTaskDto();
    completedTaskDto.id = 1;

    const errors = await validate(completedTaskDto);
    expect(errors).toEqual([]);
  });

  it('should not be valid without id', async () => {
    const completedTaskDto = new CompletedTaskDto();

    const errors = await validate(completedTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with null id', async () => {
    const completedTaskDto = new CompletedTaskDto();
    completedTaskDto.id = null;

    const errors = await validate(completedTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with undefined id', async () => {
    const completedTaskDto = new CompletedTaskDto();

    const errors = await validate(completedTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with zero id', async () => {
    const completedTaskDto = new CompletedTaskDto();
    completedTaskDto.id = 0;

    const errors = await validate(completedTaskDto);
    expect(errors).toEqual([]);
  });

  it('should be valid with negative id', async () => {
    const completedTaskDto = new CompletedTaskDto();
    completedTaskDto.id = -1;

    const errors = await validate(completedTaskDto);
    expect(errors).toEqual([]);
  });
});

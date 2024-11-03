import { validate } from 'class-validator';
import { DeleteTaskDto } from './delete-task.dto';

describe('DeleteTaskDto', () => {
  it('should be valid', async () => {
    const deleteTaskDto = new DeleteTaskDto();
    deleteTaskDto.id = 1;

    const errors = await validate(deleteTaskDto);
    expect(errors).toEqual([]);
  });

  it('should not be valid without id', async () => {
    const deleteTaskDto = new DeleteTaskDto();

    const errors = await validate(deleteTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with null id', async () => {
    const deleteTaskDto = new DeleteTaskDto();
    deleteTaskDto.id = null;

    const errors = await validate(deleteTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with undefined id', async () => {
    const deleteTaskDto = new DeleteTaskDto();

    const errors = await validate(deleteTaskDto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'id should not be empty',
    });
  });

  it('should not be valid with zero id', async () => {
    const deleteTaskDto = new DeleteTaskDto();
    deleteTaskDto.id = 0;

    const errors = await validate(deleteTaskDto);
    expect(errors).toEqual([]);
  });

  it('should be valid with negative id', async () => {
    const deleteTaskDto = new DeleteTaskDto();
    deleteTaskDto.id = -1;

    const errors = await validate(deleteTaskDto);
    expect(errors).toEqual([]);
  });
});

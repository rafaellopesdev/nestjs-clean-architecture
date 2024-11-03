import { TaskEntity } from './task.entity';

describe('TaskEntity', () => {
  it('should create an instance of TaskEntity with provided values', () => {
    const task = new TaskEntity();
    task.id = 3;
    task.title = 'Criar texto Lorem Ipsum';
    task.description =
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.';
    task.author = 'Jorge Henrique';
    task.authorEmail = 'jorgehenrique@exemplo.com';
    task.isCompleted = 1;

    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.id).toBe(3);
    expect(task.title).toBe('Criar texto Lorem Ipsum');
    expect(task.description).toBe(
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
    );
    expect(task.author).toBe('Jorge Henrique');
    expect(task.authorEmail).toBe('jorgehenrique@exemplo.com');
    expect(task.isCompleted).toBe(1);
  });

  it('should create an instance of TaskEntity with default values', () => {
    const task = new TaskEntity();
    expect(task.isCompleted).toBeUndefined();
  });

  it('should allow optional values', () => {
    const task = new TaskEntity();
    task.title = 'Criar texto Lorem Ipsum';
    task.description =
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.';
    task.author = 'Jorge Henrique';
    task.authorEmail = 'jorgehenrique@exemplo.com';

    expect(task.id).toBeUndefined();
    expect(task.isCompleted).toBeUndefined();
  });
});

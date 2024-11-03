import { TaskMessageDTO } from './task-message.entity';

describe('TaskMessageDTO', () => {
  it('should create an instance', () => {
    const taskMessageDTO = new TaskMessageDTO();
    expect(taskMessageDTO).toBeInstanceOf(TaskMessageDTO);
  });

  it('should have properties', () => {
    const taskMessageDTO = new TaskMessageDTO();
    taskMessageDTO.taskId = '123';
    taskMessageDTO.title = 'Criar texto Lorem Ipsum';
    taskMessageDTO.description =
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.';
    taskMessageDTO.authorEmail = 'jorgehenrique@exemplo.com';

    expect(taskMessageDTO).toHaveProperty('taskId', '123');
    expect(taskMessageDTO).toHaveProperty('title', 'Criar texto Lorem Ipsum');
    expect(taskMessageDTO).toHaveProperty(
      'description',
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
    );
    expect(taskMessageDTO).toHaveProperty(
      'authorEmail',
      'jorgehenrique@exemplo.com',
    );
  });

  it('should set properties', () => {
    const taskMessageDTO = new TaskMessageDTO();
    taskMessageDTO.taskId = '123';
    taskMessageDTO.title = 'Criar texto Lorem Ipsum';
    taskMessageDTO.description =
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.';
    taskMessageDTO.authorEmail = 'jorgehenrique@exemplo.com';

    expect(taskMessageDTO.taskId).toBe('123');
    expect(taskMessageDTO.title).toBe('Criar texto Lorem Ipsum');
    expect(taskMessageDTO.description).toBe(
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
    );
    expect(taskMessageDTO.authorEmail).toBe('jorgehenrique@exemplo.com');
  });
});

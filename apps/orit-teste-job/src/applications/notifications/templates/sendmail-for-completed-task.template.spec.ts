import { SendMailForCompletedTaskTemplate } from './sendmail-for-completed-task.template';

describe('SendMailForCompletedTaskTemplate', () => {
  const template = new SendMailForCompletedTaskTemplate();

  it('should create an instance', () => {
    expect(template).toBeInstanceOf(SendMailForCompletedTaskTemplate);
  });

  it('should generate HTML template', async () => {
    const title = 'Criar texto Lorem Ipsum';
    const description =
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.';
    const html = await template.generate(title, description);

    expect(html).toContain(`Parabéns, você concluiu uma tarefa: ${title}`);
    expect(html).toContain(description);
    expect(html).toMatch(/<!DOCTYPE html>/);
  });

  it('should generate HTML template with empty title and description', async () => {
    const title = '';
    const description = '';
    const html = await template.generate(title, description);

    expect(html).toContain('Parabéns, você concluiu uma tarefa: ');
    expect(html).toContain('<p style="font-size: 16px; color: #666;"></p>');
    expect(html).toMatch(/<!DOCTYPE html>/);
  });
});

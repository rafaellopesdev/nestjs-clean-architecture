import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailForCompletedTaskTemplate } from '../templates/sendmail-for-completed-task.template';
import { TaskMessageDTO } from '../entities/task-message.entity';
import { SendMailForCompletedTaskUseCase } from './sendmail-for-completed-task.use-case';

describe('SendMailForCompletedTaskUseCase', () => {
  let sendMailForCompletedTaskUseCase: SendMailForCompletedTaskUseCase;
  let mailService: MailerService;
  let template: SendMailForCompletedTaskTemplate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendMailForCompletedTaskUseCase,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        SendMailForCompletedTaskTemplate,
      ],
    }).compile();

    sendMailForCompletedTaskUseCase =
      module.get<SendMailForCompletedTaskUseCase>(
        SendMailForCompletedTaskUseCase,
      );
    mailService = module.get<MailerService>(MailerService);
    template = module.get<SendMailForCompletedTaskTemplate>(
      SendMailForCompletedTaskTemplate,
    );
  });

  it('should be defined', () => {
    expect(sendMailForCompletedTaskUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should send email when MAILTRAP_USER and MAILTRAP_PASS are defined', async () => {
      process.env.MAILTRAP_USER = 'test';
      process.env.MAILTRAP_PASS = 'test';

      const params: TaskMessageDTO = {
        title: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        authorEmail: 'author@example.com',
        taskId: '1',
      };

      const emailTemplate = 'Email template teste';
      jest.spyOn(template, 'generate').mockResolvedValue(emailTemplate);
      jest.spyOn(mailService, 'sendMail').mockResolvedValue(undefined);

      await sendMailForCompletedTaskUseCase.execute(params);

      expect(mailService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailService.sendMail).toHaveBeenCalledWith({
        from: {
          name: 'Orit Test',
          address: 'domain@domain',
        },
        to: {
          name: 'Orit Test',
          address: params.authorEmail,
        },
        subject: `Tarefa Concluida: ${params.title}`,
        html: emailTemplate,
      });
    });

    it('should not send email when MAILTRAP_USER and MAILTRAP_PASS are not defined', async () => {
      delete process.env.MAILTRAP_USER;
      delete process.env.MAILTRAP_PASS;

      const params: TaskMessageDTO = {
        title: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        authorEmail: 'author@example.com',
        taskId: '1',
      };

      await sendMailForCompletedTaskUseCase.execute(params);

      expect(mailService.sendMail).not.toHaveBeenCalled();
    });
  });
});

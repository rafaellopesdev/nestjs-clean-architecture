import { Injectable } from '@nestjs/common';
import { SendMailForCompletedTaskTemplate } from '../templates/sendmail-for-completed-task.template';
import { MailerService } from '@nestjs-modules/mailer';
import { TaskMessageDTO } from '../entities/task-message.entity';

@Injectable()
export class SendMailForCompletedTaskUseCase {
  constructor(
    private readonly mailService: MailerService,
    private readonly sendMailForCompletedTaskTemplate: SendMailForCompletedTaskTemplate,
  ) {}
  async execute(params: TaskMessageDTO) {
    const emailTemplate = await this.sendMailForCompletedTaskTemplate.generate(
      params.title,
      params.description,
    );

    if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS) {
      await this.mailService.sendMail({
        from: {
          name: 'Orit Test',
          address: 'domain@domain',
        },
        to: {
          name: 'Orit Test',
          address: params.authorEmail,
        },
        subject: `Tarefa Concluida: ${params.title}`,
        html: `${emailTemplate}`,
      });
    }

    console.log(emailTemplate);
  }
}

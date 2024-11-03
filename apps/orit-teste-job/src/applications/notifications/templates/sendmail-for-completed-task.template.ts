import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailForCompletedTaskTemplate {
  async generate(title: string, description: string) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Parabéns, você concluiu uma tarefa: ${title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <table width="600" align="center" style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd;">
        <tr>
          <td>
            <h1 style="color: #ff6b00;">Parabéns, você concluiu a tarefa:</br>${title}</h1>
            <p style="font-size: 18px;">Descrição da Tarefa:</p>
            <p style="font-size: 16px; color: #666;">${description}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
    return html;
  }
}

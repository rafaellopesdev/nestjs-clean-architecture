import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Este campo representa o título da tarefa.',
    example: 'Criar texto Lorem Ipsum',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Este campo representa a descrição da tarefa.',
    example:
      'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Este campo representa o nome do autor da tarefa.',
    example: 'Jorge Henrique',
  })
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Este campo representa o e-mail do autor da tarefa.',
    example: 'jorgehenrique@exemplo.com',
  })
  @IsEmail()
  authorEmail: string;
}

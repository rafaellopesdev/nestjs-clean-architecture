import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompletedTaskDto {
  @ApiProperty({
    description: 'Este campo representa o identificador único da tarefa',
    example: 1,
  })
  @IsNotEmpty()
  id: number;
}

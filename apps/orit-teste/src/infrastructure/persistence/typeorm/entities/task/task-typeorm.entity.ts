import { Entity, Column } from 'typeorm';

@Entity('tasks')
export class TaskTypeOrmEntity {
  @Column({
    name: 'id',
    type: 'int',
    unique: true,
    primary: true,
    generated: 'increment',
    comment: 'Identificador único da tarefa',
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    comment: 'Título da tarefa',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    comment: 'Descrição detalhada da tarefa',
  })
  description: string;

  @Column({
    name: 'author',
    type: 'varchar',
    comment: 'Nome do autor da tarefa',
  })
  author: string;

  @Column({
    name: 'author_email',
    type: 'varchar',
    comment: 'Email do autor da tarefa',
  })
  authorEmail: string;

  @Column({
    name: 'is_completed',
    type: 'bigint',
    default: 0,
    nullable: true,
    comment:
      'Indica se a tarefa está completa (1 para completo, 0 para incompleto)',
  })
  isCompleted?: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora de criação da tarefa',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Data e hora da última atualização da tarefa',
  })
  updatedAt: Date;
}

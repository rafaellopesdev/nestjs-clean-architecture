import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { IBullMqMessaging } from './interfaces/bullmq.interface';

@Injectable()
export class BullMQMessaging implements IBullMqMessaging {
  constructor(
    @InjectQueue('JOB_NOTIFICATIONS') private readonly jobQueue: Queue,
  ) {}

  async sendMessage(route: string, data: any): Promise<boolean> {
    await this.jobQueue.add(route, data);

    return true;
  }
}

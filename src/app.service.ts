import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async sendNotification(message: string) {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: message,
        },
      ],
    });
  }
}

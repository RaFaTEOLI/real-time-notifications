import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka';
import { SendNotificationDTO } from './send-notification.dto';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async sendNotification(sendNotificationDTO: SendNotificationDTO) {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: JSON.stringify(sendNotificationDTO),
        },
      ],
    });
  }
}

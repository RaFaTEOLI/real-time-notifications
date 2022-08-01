import { Controller, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendNotificationDTO } from './send-notification.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async sendNotification(@Body() sendNotificationDTO: SendNotificationDTO) {
    await this.appService.sendNotification(sendNotificationDTO.message);
    return { message: 'Notification Sent!' };
  }
}

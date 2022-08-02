import { Controller, Body, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SendNotificationDTO } from './send-notification.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return 'Hello World!';
  }

  @Post()
  async sendNotification(@Body() sendNotificationDTO: SendNotificationDTO) {
    await this.appService.sendNotification(sendNotificationDTO.message);
    return { message: 'Notification Sent!' };
  }
}

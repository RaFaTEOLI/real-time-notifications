import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { v4 } from 'uuid';

type Notification = {
  message: string;
  user: {
    name: string;
    email: string;
  };
};

@WebSocketGateway({ cors: true })
@Injectable()
export class TestConsumer implements OnModuleInit {
  @WebSocketServer()
  server;
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['test'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const notification = JSON.parse(
            message.value.toString(),
          ) as Notification;
          this.server.emit('notifications', {
            id: v4(),
            message: notification.message,
            user: notification.user,
          });
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}

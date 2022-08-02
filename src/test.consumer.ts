import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { uuid } from 'uuidv4';

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
          // this.server.emit(topic, message);
          this.server.emit('notifications', {
            id: uuid(),
            message: message.value.toString(),
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

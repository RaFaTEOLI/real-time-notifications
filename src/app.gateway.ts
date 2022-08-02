import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('notifications')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('notifications', message);
  }
}

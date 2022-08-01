import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [KafkaModule, ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, TestConsumer],
    }).compile();
  });

  describe('send notification', () => {
    it('should return "Notification Sent!"', async () => {
      const appController = app.get<AppController>(AppController);
      expect(
        await appController.sendNotification({ message: 'Hello World!' }),
      ).toBe({
        message: 'Notification Sent!',
      });
    });
  });
});

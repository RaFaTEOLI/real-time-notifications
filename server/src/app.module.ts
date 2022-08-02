import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
// import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [KafkaModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}

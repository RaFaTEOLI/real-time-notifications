import { Module } from '@nestjs/common';
import { ConsumerService, ProducerService } from './index';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}

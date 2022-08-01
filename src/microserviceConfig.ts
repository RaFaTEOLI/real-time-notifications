import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER],
    },
    consumer: {
      groupId: '1',
      allowAutoTopicCreation: true,
    },
  },
};

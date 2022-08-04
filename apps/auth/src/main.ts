import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

import { PORT } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      producer: {
        allowAutoTopicCreation: false,
      },
      client: {
        brokers: ['localhost:'],
        clientId: 'AUTH_SERVICE',
      },
    },
    transport: Transport.KAFKA,
  });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();

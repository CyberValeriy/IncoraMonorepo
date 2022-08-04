import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import TypeOrmModule from './database/db.module';
import { JsonwebtokenModule } from '@app/jsonwebtoken';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule,
    JsonwebtokenModule,
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
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
      },
    ]),
  ],
})
export class AuthModule {}

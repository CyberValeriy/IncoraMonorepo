import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import TypeOrmModule from './database/db.module';
import { JsonwebtokenModule } from '@app/jsonwebtoken';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule, JsonwebtokenModule],
})
export class AuthModule {}

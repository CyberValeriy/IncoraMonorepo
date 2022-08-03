import { Module } from '@nestjs/common';
import { JsonwebtokenService } from './jsonwebtoken.service';

@Module({
  providers: [JsonwebtokenService],
  exports: [JsonwebtokenService],
})
export class JsonwebtokenModule {}

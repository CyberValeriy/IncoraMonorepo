import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JsonwebtokenService {
  generateToken(payload, secret: string) {
    const token = jwt.sign(payload, secret);
    return token;
  }

  decodeToken(token: string, secret: string) {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}

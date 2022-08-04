import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class JsonwebtokenService {
  generateToken(
    payload: { [key: string]: any },
    secret: string,
    options = null,
  ) {
    const token = jwt.sign(payload, secret, options);
    return token;
  }

  decodeToken(token: string, secret: string, options = null) {
    try {
      const payload = jwt.verify(token, secret, options);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}

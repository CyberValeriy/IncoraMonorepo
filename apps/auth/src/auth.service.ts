import { Injectable } from '@nestjs/common';
import { JWT } from './config/app.config';

import { isPassValid } from './helpers/isPassValid';
import { JsonwebtokenService } from '@app/jsonwebtoken/jsonwebtoken.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JsonwebtokenService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(email: string, password: string) {
    //db request find
    const user: any = {};
    await isPassValid(password, user.password);
    const accessToken = this.jwtService.generateToken({}, JWT.ACCESS_SECRET);
    const refreshToken = this.jwtService.generateToken({}, JWT.REFRESH_SECRET);
    return { user, accessToken, refreshToken };
  }

  async signup(email: string, password: string) {
    //db request create
    const user: any = {};
    const accessToken = this.jwtService.generateToken({}, JWT.ACCESS_SECRET);
    const refreshToken = this.jwtService.generateToken({}, JWT.REFRESH_SECRET);
    return { user, accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.decodeToken(token, JWT.REFRESH_SECRET);
    //find user
    const accessToken = this.jwtService.generateToken({}, JWT.ACCESS_SECRET);
    const refreshToken = this.jwtService.generateToken({}, JWT.REFRESH_SECRET);
    return { accessToken, refreshToken };
  }
}

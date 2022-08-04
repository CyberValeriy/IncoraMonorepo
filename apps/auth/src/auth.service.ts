import { Inject, Injectable } from '@nestjs/common';
import { JWT } from './config/app.config';

import { JsonwebtokenService } from '@app/jsonwebtoken/jsonwebtoken.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JsonwebtokenService,
    @Inject('AUTH_CLIENT') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(email: string, password: string) {
    let user = null;
    this.authClient
      .send('login_user', { email, password })
      .subscribe((userData) => (user = userData));

    const accessToken: string = this.jwtService.generateToken(
      { email: user.email, userId: user.id },
      JWT.ACCESS_SECRET,
      { expiresIn: JWT.TTL_ACCESS, subject: 'access' },
    );
    const refreshToken: string = this.jwtService.generateToken(
      { email: user.email, userId: user.id },
      JWT.REFRESH_SECRET,
      { expiresIn: JWT.REFRESH_SECRET, subject: 'refresh' },
    );
    return { user, accessToken, refreshToken };
  }

  async signup(email: string, password: string) {
    let user = null;

    this.authClient
      .send('signup_user', { email, password })
      .subscribe((userData) => (user = userData));

    const accessToken: string = this.jwtService.generateToken(
      //remove duplicate
      { email: user.email, userId: user.id },
      JWT.ACCESS_SECRET,
      { expiresIn: JWT.TTL_ACCESS, subject: 'access' },
    );
    const refreshToken: string = this.jwtService.generateToken(
      { email: user.email, userId: user.id },
      JWT.REFRESH_SECRET,
      { expiresIn: JWT.REFRESH_SECRET, subject: 'refresh' },
    );
    return { user, accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.decodeToken(token, JWT.REFRESH_SECRET); //need to find user in this situation?
    const accessToken = this.jwtService.generateToken(
      payload,
      JWT.ACCESS_SECRET,
      { expiresIn: JWT.TTL_ACCESS, subject: 'access' },
    );
    const refreshToken = this.jwtService.generateToken(
      payload,
      JWT.REFRESH_SECRET,
      { expiresIn: JWT.TTL_REFRESH, subject: 'refresh' },
    );
    return { accessToken, refreshToken };
  }
}

/*
    ADD USER INTERFACE
    REFACTOR,CREATE ANOTHER MODULE (COPY CODE FROM APP MODULE)
*/

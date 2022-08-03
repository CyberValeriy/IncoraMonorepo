import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthDto, RefreshTokenDto } from './dtos';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('/login')
  async login(@Body() body: AuthDto) {
    const data = await this.authService.login(body.email, body.password);
    return { success: true, data };
  }

  @Post('/signup')
  async signup(@Body() body: AuthDto) {
    const data = await this.authService.signup(body.email, body.password);
    return { success: true, data };
  }

  @Post('/refreshToken')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const data = await this.authService.refreshToken(body.refreshToken);
    return { success: true, data };
  }
}

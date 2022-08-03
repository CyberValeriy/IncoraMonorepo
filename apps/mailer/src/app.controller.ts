import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import sendMail from './utils/nodemailer.util';
import { IOrderEmail } from './interfaces/order.interface';

@Controller()
export class AppController {
  @EventPattern('send_email')
  async sendEmail(data: IOrderEmail): Promise<void> {
    await sendMail(data);
  }
}

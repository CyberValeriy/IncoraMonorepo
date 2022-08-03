/* eslint-disable prettier/prettier */

import { createTransport, SendMailOptions } from 'nodemailer';
import { mailer } from '../config/application.config';
import { IOrderEmail } from '../interfaces/order.interface';

const transport = createTransport({
  // how to add template engine?
  service: mailer.service,
  secure: mailer.secure,
  auth: {
    user: mailer.auth.user,
    pass: mailer.auth.pass,
  },
});

export default async (data: IOrderEmail): Promise<void> => {
  const emailOptions: SendMailOptions = {
    from: 'Incora first!',
    to: data.email,
    text: `Your order id is:${data.orderId}`,
    html: `Your order id is:${data.orderId}`,
  };
  await transport.sendMail(emailOptions);
};

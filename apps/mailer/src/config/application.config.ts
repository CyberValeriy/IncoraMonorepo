/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
const env = process.env;

export const mailer = {
  //how to create env for my project only?
  service: env.MAILER_SERVICE,
  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASSWORD,
  },
  secure: true,
};

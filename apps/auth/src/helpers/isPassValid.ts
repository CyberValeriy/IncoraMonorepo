import { UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

//create lib with hash and compare password

export const isPassValid = async (password: string, dbPaswword: string) => {
  const isValid = await bcrypt.compare(password, dbPaswword);
  if (!isValid) {
    throw new UnauthorizedException('Invalid password!');
  }
};

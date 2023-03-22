import { compare, hash } from 'bcrypt';

export const hashPassword = async (password) => await hash(password, 10);
export const comparePassword = async (password, hashedPassword) =>
  await compare(password, hashedPassword);

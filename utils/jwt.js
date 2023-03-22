import * as dotenv from 'dotenv';
import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;
dotenv.config();

const { JWT_SECRET } = process.env;

export const signJwt = (payload) => {
  return sign(payload, JWT_SECRET);
};

export const verifyJwt = (token) => {
  return verify(token, JWT_SECRET);
};

export const generateToken = (id) => signJwt({ id });

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AUTH_SECRET;
if (!JWT_SECRET) {
  throw new Error("FATAL ERROR: AUTH_SECRET is not defined in environment variables.");
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { errorResponse } from '../utils/response';

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // Check Header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }

    if (!token) {
      return errorResponse(res, 'Authentication required. Please login.', 401);
    }

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired authentication token.', 401);
  }
};

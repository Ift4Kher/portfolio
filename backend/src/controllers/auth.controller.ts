import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { successResponse, errorResponse } from '../utils/response';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required.', 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse(res, 'Invalid credentials.', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials.', 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return successResponse(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 'Login successful.');
  } catch (error: any) {
    return errorResponse(res, error.message || 'Login failed.');
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('admin_token');
  return successResponse(res, null, 'Logged out successfully.');
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'User profile fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

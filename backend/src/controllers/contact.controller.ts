import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const submitMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return errorResponse(res, 'All fields (name, email, subject, message) are required.', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 'Please provide a valid email address.', 400);
    }

    if (name.length > 100 || email.length > 100 || subject.length > 200 || message.length > 5000) {
      return errorResponse(res, 'Input length exceeds maximum allowed limit.', 400);
    }

    // Basic sanitization
    const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: sanitize(name.trim()),
        email: email.trim(),
        subject: sanitize(subject.trim()),
        message: sanitize(message.trim()),
        ipAddress
      }
    });

    return successResponse(res, newMessage, 'Thank you! Your message has been sent successfully.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return successResponse(res, messages, 'Contact messages fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read: read !== undefined ? Boolean(read) : true }
    });

    return successResponse(res, message, 'Message read status updated.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    return successResponse(res, null, 'Message deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

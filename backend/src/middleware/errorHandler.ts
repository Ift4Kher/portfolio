import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  const message = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || 500;
  return errorResponse(res, message, statusCode);
};

export const notFoundHandler = (_req: Request, res: Response) => {
  return errorResponse(res, 'Requested REST API route not found.', 404);
};

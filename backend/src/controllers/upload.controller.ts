import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';

export const uploadFile = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded.', 400);
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    return successResponse(res, { url: fileUrl, filename: req.file.filename }, 'File uploaded successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const uploadMultipleFiles = (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return errorResponse(res, 'No files uploaded.', 400);
    }
    const files = (req.files as Express.Multer.File[]).map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename
    }));
    return successResponse(res, { files }, 'Files uploaded successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

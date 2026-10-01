import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getEducation = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user !== undefined;
    const education = await prisma.education.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: { displayOrder: 'asc' }
    });
    return successResponse(res, education, 'Education list fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { degree, institution, result, startDate, endDate, description, displayOrder, published } = req.body;
    if (!degree || !institution || !startDate) {
      return errorResponse(res, 'Degree, institution, and start date are required.', 400);
    }

    const edu = await prisma.education.create({
      data: {
        degree,
        institution,
        result,
        startDate,
        endDate: endDate || 'Present',
        description,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        published: published !== undefined ? Boolean(published) : true
      }
    });
    return successResponse(res, edu, 'Education entry created.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { degree, institution, result, startDate, endDate, description, displayOrder, published } = req.body;

    const edu = await prisma.education.update({
      where: { id },
      data: {
        degree,
        institution,
        result,
        startDate,
        endDate,
        description,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
        published: published !== undefined ? Boolean(published) : undefined
      }
    });
    return successResponse(res, edu, 'Education entry updated.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    return successResponse(res, null, 'Education entry deleted.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

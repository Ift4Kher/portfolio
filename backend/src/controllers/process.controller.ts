import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getProcessSteps = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user !== undefined;
    const steps = await prisma.processStep.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: { displayOrder: 'asc' }
    });
    return successResponse(res, steps, 'Process steps fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createProcessStep = async (req: Request, res: Response) => {
  try {
    const { stepNumber, title, description, icon, displayOrder, published } = req.body;
    if (!stepNumber || !title || !description) {
      return errorResponse(res, 'Step number, title, and description are required.', 400);
    }

    const step = await prisma.processStep.create({
      data: {
        stepNumber,
        title,
        description,
        icon: icon || 'code',
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        published: published !== undefined ? Boolean(published) : true
      }
    });
    return successResponse(res, step, 'Process step created.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateProcessStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stepNumber, title, description, icon, displayOrder, published } = req.body;

    const step = await prisma.processStep.update({
      where: { id },
      data: {
        stepNumber,
        title,
        description,
        icon,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
        published: published !== undefined ? Boolean(published) : undefined
      }
    });
    return successResponse(res, step, 'Process step updated.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteProcessStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.processStep.delete({ where: { id } });
    return successResponse(res, null, 'Process step deleted.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

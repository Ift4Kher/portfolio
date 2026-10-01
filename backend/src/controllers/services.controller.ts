import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getServices = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user !== undefined;
    const services = await prisma.service.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: { displayOrder: 'asc' }
    });
    return successResponse(res, services, 'Services fetched successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return errorResponse(res, 'Service not found.', 404);
    return successResponse(res, service, 'Service fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, icon, displayOrder, published } = req.body;
    if (!title || !description) return errorResponse(res, 'Title and description are required.', 400);

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || 'code',
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        published: published !== undefined ? Boolean(published) : true
      }
    });
    return successResponse(res, service, 'Service created successfully.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, icon, displayOrder, published } = req.body;

    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        icon,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
        published: published !== undefined ? Boolean(published) : undefined
      }
    });
    return successResponse(res, service, 'Service updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return successResponse(res, null, 'Service deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

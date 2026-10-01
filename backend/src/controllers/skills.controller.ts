import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getSkills = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user !== undefined;
    const skills = await prisma.skill.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }]
    });
    return successResponse(res, skills, 'Skills fetched successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getSkillById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) return errorResponse(res, 'Skill not found.', 404);
    return successResponse(res, skill, 'Skill fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, category, icon, proficiency, displayOrder, published } = req.body;
    if (!name || !category) return errorResponse(res, 'Name and category are required.', 400);

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        icon: icon || 'code',
        proficiency: proficiency ? parseInt(proficiency) : 90,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        published: published !== undefined ? Boolean(published) : true
      }
    });
    return successResponse(res, skill, 'Skill created successfully.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, icon, proficiency, displayOrder, published } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        icon,
        proficiency: proficiency !== undefined ? parseInt(proficiency) : undefined,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : undefined,
        published: published !== undefined ? Boolean(published) : undefined
      }
    });
    return successResponse(res, skill, 'Skill updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return successResponse(res, null, 'Skill deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

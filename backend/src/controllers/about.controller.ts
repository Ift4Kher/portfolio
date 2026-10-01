import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getAbout = async (_req: Request, res: Response) => {
  try {
    let about = await prisma.about.findFirst();
    if (!about) {
      about = await prisma.about.create({
        data: {
          title: "About Me",
          description: "Full-Stack Web Developer",
          bio: "Building robust modern web applications.",
          image: "/images/rifat-hero.png"
        }
      });
    }
    return successResponse(res, about, 'About section fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const { title, description, bio, yearsExperience, completedProjects, clientsServed, image } = req.body;
    let about = await prisma.about.findFirst();

    if (!about) {
      about = await prisma.about.create({
        data: { title, description, bio, yearsExperience, completedProjects, clientsServed, image }
      });
    } else {
      about = await prisma.about.update({
        where: { id: about.id },
        data: { title, description, bio, yearsExperience, completedProjects, clientsServed, image }
      });
    }

    return successResponse(res, about, 'About section updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

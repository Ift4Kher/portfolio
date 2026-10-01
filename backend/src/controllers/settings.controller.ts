import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getSettings = async (_req: Request, res: Response) => {
  try {
    let settings = await prisma.siteSetting.findFirst();
    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          siteTitle: "Md Iftakhar Ahmed Rifat — Web Developer Portfolio",
          metaDescription: "Professional portfolio of Md Iftakhar Ahmed Rifat, Web Developer.",
          contactEmail: "rifat.dev@example.com"
        }
      });
    }

    const socials = await prisma.socialLink.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' }
    });

    return successResponse(res, { settings, socials }, 'Site settings fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { siteTitle, metaDescription, contactEmail, contactPhone, contactLocation, cvUrl, footerText } = req.body;
    let settings = await prisma.siteSetting.findFirst();

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: { siteTitle, metaDescription, contactEmail, contactPhone, contactLocation, cvUrl, footerText }
      });
    } else {
      settings = await prisma.siteSetting.update({
        where: { id: settings.id },
        data: { siteTitle, metaDescription, contactEmail, contactPhone, contactLocation, cvUrl, footerText }
      });
    }

    return successResponse(res, settings, 'Settings updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const totalProjects = await prisma.project.count();
    const publishedProjects = await prisma.project.count({ where: { published: true } });
    const featuredProjects = await prisma.project.count({ where: { featured: true } });
    const totalServices = await prisma.service.count();
    const totalSkills = await prisma.skill.count();
    const unreadMessages = await prisma.contactMessage.count({ where: { read: false } });

    return successResponse(res, {
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalServices,
      totalSkills,
      unreadMessages
    }, 'Dashboard statistics fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

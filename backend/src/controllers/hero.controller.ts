import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getHero = async (_req: Request, res: Response) => {
  try {
    let hero = await prisma.hero.findFirst();
    if (!hero) {
      hero = await prisma.hero.create({
        data: {
          greeting: "Hello, I'm",
          name: "Md Iftakhar Ahmed Rifat",
          title: "Web Developer",
          subtitle: "Building modern, responsive, and functional web applications.",
          profileImage: "/images/rifat-hero.png"
        }
      });
    }
    return successResponse(res, hero, 'Hero section fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const { greeting, name, title, subtitle, profileImage, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink } = req.body;
    let hero = await prisma.hero.findFirst();

    if (!hero) {
      hero = await prisma.hero.create({
        data: { greeting, name, title, subtitle, profileImage, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink }
      });
    } else {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: { greeting, name, title, subtitle, profileImage, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink }
      });
    }

    return successResponse(res, hero, 'Hero section updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

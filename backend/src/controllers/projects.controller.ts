import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { successResponse, errorResponse } from '../utils/response';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, search, featured, published } = req.query;
    const isAdmin = req.user !== undefined;

    const whereClause: any = {};

    if (!isAdmin) {
      whereClause.published = true;
    } else if (published !== undefined) {
      whereClause.published = published === 'true';
    }

    if (featured !== undefined) {
      whereClause.featured = featured === 'true';
    }

    if (category && category !== 'All') {
      whereClause.categories = {
        some: {
          category: {
            slug: String(category).toLowerCase()
          }
        }
      };
    }

    if (search) {
      const q = String(search);
      whereClause.OR = [
        { title: { contains: q } },
        { shortDescription: { contains: q } },
        { fullDescription: { contains: q } }
      ];
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
        gallery: { orderBy: { displayOrder: 'asc' } }
      },
      orderBy: [
        { featured: 'desc' },
        { carouselOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    const formattedProjects = projects.map(p => ({
      ...p,
      categoriesList: p.categories.map(c => c.category.name),
      technologiesList: p.technologies.map(t => t.technology.name)
    }));

    return successResponse(res, formattedProjects, 'Projects fetched successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getFeaturedProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
        published: true
      },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
        gallery: { orderBy: { displayOrder: 'asc' } }
      },
      orderBy: { carouselOrder: 'asc' }
    });

    const formatted = projects.map(p => ({
      ...p,
      categoriesList: p.categories.map(c => c.category.name),
      technologiesList: p.technologies.map(t => t.technology.name)
    }));

    return successResponse(res, formatted, 'Featured 3D carousel projects fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
        gallery: { orderBy: { displayOrder: 'asc' } }
      }
    });

    if (!project || (!req.user && !project.published)) {
      return errorResponse(res, 'Project not found.', 404);
    }

    const formatted = {
      ...project,
      categoriesList: project.categories.map(c => c.category.name),
      technologiesList: project.technologies.map(t => t.technology.name)
    };

    return successResponse(res, formatted, 'Project detail fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
        gallery: { orderBy: { displayOrder: 'asc' } }
      }
    });

    if (!project) return errorResponse(res, 'Project not found.', 404);

    const formatted = {
      ...project,
      categoriesList: project.categories.map(c => c.category.name),
      technologiesList: project.technologies.map(t => t.technology.name)
    };

    return successResponse(res, formatted, 'Project fetched.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      fullDescription,
      overview,
      problem,
      solution,
      keyFeatures,
      challenges,
      results,
      coverImage,
      githubUrl,
      liveDemoUrl,
      featured,
      published,
      carouselOrder,
      accentColor,
      categories, // string[] of category names/slugs
      technologies, // string[] of tech names
      galleryImages // string[] or { imageUrl, caption }[]
    } = req.body;

    if (!title || !shortDescription || !fullDescription || !coverImage) {
      return errorResponse(res, 'Title, shortDescription, fullDescription, and coverImage are required.', 400);
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const project = await prisma.project.create({
      data: {
        title,
        slug: generatedSlug,
        shortDescription,
        fullDescription,
        overview,
        problem,
        solution,
        keyFeatures: typeof keyFeatures === 'object' ? JSON.stringify(keyFeatures) : keyFeatures,
        challenges,
        results,
        coverImage,
        githubUrl,
        liveDemoUrl,
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
        carouselOrder: carouselOrder ? parseInt(carouselOrder) : 0,
        accentColor: accentColor || '#06b6d4'
      }
    });

    // Process categories
    if (Array.isArray(categories)) {
      for (const catName of categories) {
        const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
        const categoryObj = await prisma.category.upsert({
          where: { slug: catSlug },
          update: { name: catName },
          create: { name: catName, slug: catSlug }
        });
        await prisma.projectCategory.create({
          data: { projectId: project.id, categoryId: categoryObj.id }
        });
      }
    }

    // Process technologies
    if (Array.isArray(technologies)) {
      for (const techName of technologies) {
        const techObj = await prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName }
        });
        await prisma.projectTechnology.create({
          data: { projectId: project.id, technologyId: techObj.id }
        });
      }
    }

    // Process gallery
    if (Array.isArray(galleryImages)) {
      for (let i = 0; i < galleryImages.length; i++) {
        const item = galleryImages[i];
        const imageUrl = typeof item === 'string' ? item : item.imageUrl;
        const caption = typeof item === 'object' ? item.caption : undefined;
        await prisma.projectImage.create({
          data: { projectId: project.id, imageUrl, caption, displayOrder: i + 1 }
        });
      }
    }

    return successResponse(res, project, 'Project created successfully.', 201);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      shortDescription,
      fullDescription,
      overview,
      problem,
      solution,
      keyFeatures,
      challenges,
      results,
      coverImage,
      githubUrl,
      liveDemoUrl,
      featured,
      published,
      carouselOrder,
      accentColor,
      categories,
      technologies,
      galleryImages
    } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        shortDescription,
        fullDescription,
        overview,
        problem,
        solution,
        keyFeatures: typeof keyFeatures === 'object' ? JSON.stringify(keyFeatures) : keyFeatures,
        challenges,
        results,
        coverImage,
        githubUrl,
        liveDemoUrl,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        published: published !== undefined ? Boolean(published) : undefined,
        carouselOrder: carouselOrder !== undefined ? parseInt(carouselOrder) : undefined,
        accentColor
      }
    });

    // Sync categories if provided
    if (Array.isArray(categories)) {
      await prisma.projectCategory.deleteMany({ where: { projectId: id } });
      for (const catName of categories) {
        const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
        const categoryObj = await prisma.category.upsert({
          where: { slug: catSlug },
          update: { name: catName },
          create: { name: catName, slug: catSlug }
        });
        await prisma.projectCategory.create({
          data: { projectId: id, categoryId: categoryObj.id }
        });
      }
    }

    // Sync technologies if provided
    if (Array.isArray(technologies)) {
      await prisma.projectTechnology.deleteMany({ where: { projectId: id } });
      for (const techName of technologies) {
        const techObj = await prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName }
        });
        await prisma.projectTechnology.create({
          data: { projectId: id, technologyId: techObj.id }
        });
      }
    }

    // Sync gallery if provided
    if (Array.isArray(galleryImages)) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
      for (let i = 0; i < galleryImages.length; i++) {
        const item = galleryImages[i];
        const imageUrl = typeof item === 'string' ? item : item.imageUrl;
        const caption = typeof item === 'object' ? item.caption : undefined;
        await prisma.projectImage.create({
          data: { projectId: id, imageUrl, caption, displayOrder: i + 1 }
        });
      }
    }

    return successResponse(res, project, 'Project updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return successResponse(res, null, 'Project deleted successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const togglePublish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return errorResponse(res, 'Project not found.', 404);

    const updated = await prisma.project.update({
      where: { id },
      data: { published: !project.published }
    });

    return successResponse(res, updated, `Project ${updated.published ? 'published' : 'unpublished'} successfully.`);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return errorResponse(res, 'Project not found.', 404);

    const updated = await prisma.project.update({
      where: { id },
      data: { featured: !project.featured }
    });

    return successResponse(res, updated, `Project ${updated.featured ? 'featured' : 'unfeatured'} successfully.`);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const reorderCarousel = async (req: Request, res: Response) => {
  try {
    const { items } = req.body; // Array of { id: string, carouselOrder: number }
    if (!Array.isArray(items)) {
      return errorResponse(res, 'Items array required for reordering.', 400);
    }

    for (const item of items) {
      await prisma.project.update({
        where: { id: item.id },
        data: { carouselOrder: parseInt(item.carouselOrder) }
      });
    }

    return successResponse(res, null, '3D Carousel project order updated successfully.');
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

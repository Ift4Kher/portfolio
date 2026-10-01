export interface HeroData {
  id: string;
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  profileImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface AboutData {
  id: string;
  title: string;
  description: string;
  bio: string;
  yearsExperience: number;
  completedProjects: number;
  clientsServed: number;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  published: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | string;
  icon: string;
  proficiency: number;
  displayOrder: number;
  published: boolean;
}

export interface ProjectImageItem {
  id: string;
  projectId: string;
  imageUrl: string;
  caption?: string;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  overview?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string; // JSON string or array
  challenges?: string;
  results?: string;
  coverImage: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  published: boolean;
  carouselOrder: number;
  accentColor?: string;
  categoriesList?: string[];
  technologiesList?: string[];
  gallery?: ProjectImageItem[];
  createdAt: string;
  updatedAt: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  result?: string;
  startDate: string;
  endDate: string;
  description?: string;
  displayOrder: number;
  published: boolean;
}

export interface ProcessStepItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  icon?: string;
  displayOrder: number;
  published: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
  published: boolean;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  ipAddress?: string;
  createdAt: string;
}

export interface SiteSettingsData {
  id: string;
  siteTitle: string;
  metaDescription: string;
  contactEmail: string;
  contactPhone?: string;
  contactLocation?: string;
  cvUrl: string;
  footerText: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  featuredProjects: number;
  totalServices: number;
  totalSkills: number;
  unreadMessages: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

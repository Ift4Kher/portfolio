import {
  ApiResponse,
  HeroData,
  AboutData,
  ServiceItem,
  SkillItem,
  ProjectItem,
  EducationItem,
  ProcessStepItem,
  ContactMessageItem,
  SiteSettingsData,
  SocialLinkItem,
  DashboardStats,
  AdminUser
} from '../types';

import {
  fallbackHero,
  fallbackAbout,
  fallbackServices,
  fallbackSkills,
  fallbackProjects,
  fallbackEducation,
  fallbackProcess,
  fallbackSettings,
  fallbackSocials
} from './fallbackData';

const API_BASE_URL = (((import.meta as any).env?.VITE_API_URL as string) || '/api').replace(/\/$/, '');

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('admin_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> || {})
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
      ...options,
      headers
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`Invalid content-type from server: ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && this.token) {
        this.setToken(null);
      }
      throw new Error(data.message || 'API Request failed');
    }

    return data;
  }

  // Public Endpoints with Fallback
  async getHero(): Promise<HeroData> {
    try {
      const res = await this.request<HeroData>('/hero');
      return res.data || fallbackHero;
    } catch {
      return fallbackHero;
    }
  }

  async getAbout(): Promise<AboutData> {
    try {
      const res = await this.request<AboutData>('/about');
      return res.data || fallbackAbout;
    } catch {
      return fallbackAbout;
    }
  }

  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await this.request<ServiceItem[]>('/services');
      return (res.data && res.data.length > 0) ? res.data : fallbackServices;
    } catch {
      return fallbackServices;
    }
  }

  async getSkills(): Promise<SkillItem[]> {
    try {
      const res = await this.request<SkillItem[]>('/skills');
      return (res.data && res.data.length > 0) ? res.data : fallbackSkills;
    } catch {
      return fallbackSkills;
    }
  }

  async getFeaturedProjects(): Promise<ProjectItem[]> {
    try {
      const res = await this.request<ProjectItem[]>('/projects/featured');
      return (res.data && res.data.length > 0) ? res.data : fallbackProjects.filter(p => p.featured);
    } catch {
      return fallbackProjects.filter(p => p.featured);
    }
  }

  async getProjects(category: string = 'All', search: string = ''): Promise<ProjectItem[]> {
    try {
      let url = `/projects?category=${encodeURIComponent(category)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await this.request<ProjectItem[]>(url);
      if (res.data && res.data.length > 0) return res.data;
    } catch {
      // Fallback filtering
    }

    let filtered = [...fallbackProjects];
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.categoriesList?.includes(category));
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.fullDescription.toLowerCase().includes(s)
      );
    }
    return filtered;
  }

  async getProjectBySlug(slug: string): Promise<ProjectItem> {
    try {
      const res = await this.request<ProjectItem>(`/projects/slug/${encodeURIComponent(slug)}`);
      if (res.data) return res.data;
    } catch {
      // Fallback search
    }

    const found = fallbackProjects.find(p => p.slug === slug);
    if (found) return found;
    return fallbackProjects[0];
  }

  async getEducation(): Promise<EducationItem[]> {
    try {
      const res = await this.request<EducationItem[]>('/education');
      return (res.data && res.data.length > 0) ? res.data : fallbackEducation;
    } catch {
      return fallbackEducation;
    }
  }

  async getProcessSteps(): Promise<ProcessStepItem[]> {
    try {
      const res = await this.request<ProcessStepItem[]>('/process');
      return (res.data && res.data.length > 0) ? res.data : fallbackProcess;
    } catch {
      return fallbackProcess;
    }
  }

  async getSettings(): Promise<{ settings: SiteSettingsData; socials: SocialLinkItem[] }> {
    try {
      const res = await this.request<{ settings: SiteSettingsData; socials: SocialLinkItem[] }>('/settings');
      if (res.data?.settings) return res.data;
    } catch {
      // Fallback
    }
    return { settings: fallbackSettings, socials: fallbackSocials };
  }

  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<ContactMessageItem> {
    try {
      const res = await this.request<ContactMessageItem>('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.data;
    } catch {
      return {
        id: 'msg-fallback',
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        read: false,
        createdAt: new Date().toISOString()
      };
    }
  }

  // Admin Auth
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await this.request<{ token: string; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.data.token) {
      this.setToken(res.data.token);
    }
    return res.data;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getMe(): Promise<AdminUser> {
    const res = await this.request<AdminUser>('/auth/me');
    return res.data;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await this.request<DashboardStats>('/settings/stats');
      return res.data;
    } catch {
      return {
        totalProjects: fallbackProjects.length,
        publishedProjects: fallbackProjects.length,
        featuredProjects: fallbackProjects.filter(p => p.featured).length,
        totalServices: fallbackServices.length,
        totalSkills: fallbackSkills.length,
        unreadMessages: 0
      };
    }
  }

  // Admin Hero & About
  async updateHero(data: Partial<HeroData>): Promise<HeroData> {
    const res = await this.request<HeroData>('/hero', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateAbout(data: Partial<AboutData>): Promise<AboutData> {
    const res = await this.request<AboutData>('/about', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  // Admin Services
  async createService(data: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await this.request<ServiceItem>('/services', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await this.request<ServiceItem>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteService(id: string): Promise<void> {
    await this.request(`/services/${id}`, { method: 'DELETE' });
  }

  // Admin Skills
  async createSkill(data: Partial<SkillItem>): Promise<SkillItem> {
    const res = await this.request<SkillItem>('/skills', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateSkill(id: string, data: Partial<SkillItem>): Promise<SkillItem> {
    const res = await this.request<SkillItem>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteSkill(id: string): Promise<void> {
    await this.request(`/skills/${id}`, { method: 'DELETE' });
  }

  // Admin Projects
  async getAdminProjectById(id: string): Promise<ProjectItem> {
    const res = await this.request<ProjectItem>(`/projects/id/${id}`);
    return res.data;
  }

  async createProject(data: any): Promise<ProjectItem> {
    const res = await this.request<ProjectItem>('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateProject(id: string, data: any): Promise<ProjectItem> {
    const res = await this.request<ProjectItem>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  async toggleProjectPublish(id: string): Promise<ProjectItem> {
    const res = await this.request<ProjectItem>(`/projects/${id}/publish`, { method: 'PATCH' });
    return res.data;
  }

  async toggleProjectFeatured(id: string): Promise<ProjectItem> {
    const res = await this.request<ProjectItem>(`/projects/${id}/featured`, { method: 'PATCH' });
    return res.data;
  }

  async reorderCarousel(items: { id: string; carouselOrder: number }[]): Promise<void> {
    await this.request('/projects/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ items })
    });
  }

  // Admin Education
  async createEducation(data: Partial<EducationItem>): Promise<EducationItem> {
    const res = await this.request<EducationItem>('/education', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateEducation(id: string, data: Partial<EducationItem>): Promise<EducationItem> {
    const res = await this.request<EducationItem>(`/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteEducation(id: string): Promise<void> {
    await this.request(`/education/${id}`, { method: 'DELETE' });
  }

  // Admin Process Steps
  async createProcessStep(data: Partial<ProcessStepItem>): Promise<ProcessStepItem> {
    const res = await this.request<ProcessStepItem>('/process', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateProcessStep(id: string, data: Partial<ProcessStepItem>): Promise<ProcessStepItem> {
    const res = await this.request<ProcessStepItem>(`/process/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteProcessStep(id: string): Promise<void> {
    await this.request(`/process/${id}`, { method: 'DELETE' });
  }

  // Admin Messages
  async getMessages(): Promise<ContactMessageItem[]> {
    try {
      const res = await this.request<ContactMessageItem[]>('/contact');
      return res.data || [];
    } catch {
      return [];
    }
  }

  async markMessageRead(id: string, read: boolean = true): Promise<ContactMessageItem> {
    const res = await this.request<ContactMessageItem>(`/contact/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ read })
    });
    return res.data;
  }

  async deleteMessage(id: string): Promise<void> {
    await this.request(`/contact/${id}`, { method: 'DELETE' });
  }

  // Admin Settings
  async updateSettings(data: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
    const res = await this.request<SiteSettingsData>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async createSocialLink(data: Partial<SocialLinkItem>): Promise<SocialLinkItem> {
    const res = await this.request<SocialLinkItem>('/settings/socials', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async updateSocialLink(id: string, data: Partial<SocialLinkItem>): Promise<SocialLinkItem> {
    const res = await this.request<SocialLinkItem>(`/settings/socials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  }

  async deleteSocialLink(id: string): Promise<void> {
    await this.request(`/settings/socials/${id}`, { method: 'DELETE' });
  }

  // Upload File
  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await this.request<{ url: string; filename: string }>('/upload/single', {
      method: 'POST',
      body: formData
    });
    return res.data;
  }
}

export const api = new ApiService();

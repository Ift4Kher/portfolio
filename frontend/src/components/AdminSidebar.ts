import { api } from '../services/api';

export function renderAdminSidebar(currentPath: string): string {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400 transition-colors';
    const svgClass = `w-[18px] h-[18px] ${iconClass}`;
    
    switch (iconName) {
      case 'dashboard':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`;
      case 'projects':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`;
      case 'carousel':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>`;
      case 'services':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      case 'skills':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
      case 'education':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v6"/></svg>`;
      case 'process':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`;
      case 'about':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`;
      case 'hero':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
      case 'messages':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`;
      case 'settings':
        return `<svg class="${svgClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
      default:
        return '';
    }
  };

  const menuSections = [
    {
      title: 'MAIN',
      links: [
        { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
        { label: 'Projects', path: '/admin/projects', icon: 'projects' },
        { label: '3D Carousel', path: '/admin/carousel', icon: 'carousel' },
      ]
    },
    {
      title: 'CONTENT',
      links: [
        { label: 'Services', path: '/admin/services', icon: 'services' },
        { label: 'Skills', path: '/admin/skills', icon: 'skills' },
        { label: 'Education', path: '/admin/education', icon: 'education' },
        { label: 'Process', path: '/admin/process', icon: 'process' },
        { label: 'About Me', path: '/admin/about', icon: 'about' },
        { label: 'Hero Section', path: '/admin/hero', icon: 'hero' },
      ]
    },
    {
      title: 'COMMUNICATION',
      links: [
        { label: 'Messages', path: '/admin/messages', icon: 'messages' },
      ]
    },
    {
      title: 'SYSTEM',
      links: [
        { label: 'Site Settings', path: '/admin/settings', icon: 'settings' },
      ]
    }
  ];

  return `
    <aside id="admin-sidebar" class="w-[260px] bg-[#030711] border-r border-[#1A233A] flex flex-col justify-between hidden md:flex min-h-screen sticky top-0 z-40 overflow-y-auto">
      <div class="flex flex-col flex-1">
        <!-- Logo -->
        <a href="#/admin" class="flex items-center gap-3 p-6 shrink-0">
          <div class="w-10 h-10 rounded-xl bg-transparent border border-[#00D9FF]/30 p-[1px]">
            <div class="w-full h-full bg-[#00D9FF]/10 rounded-[10px] flex items-center justify-center font-bold font-mono text-[#00D9FF] text-[13px]">
              CMS
            </div>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-slate-200 text-[14px]">Portfolio Admin</span>
            <span class="text-[11px] text-slate-500">Md Iftakhar Ahmed Rifat</span>
          </div>
        </a>

        <!-- Navigation Links -->
        <nav class="flex-1 px-4 pb-6 space-y-6">
          ${menuSections.map(section => `
            <div class="space-y-2">
              <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3">${section.title}</h3>
              <div class="space-y-0.5">
                ${section.links.map(link => {
                  const isActive = currentPath === link.path || (link.path !== '/admin' && currentPath.startsWith(link.path));
                  return `
                    <a 
                      href="#${link.path}" 
                      class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${isActive ? 'bg-[#00D9FF]/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-[#111C35]'}"
                    >
                      ${getIcon(link.icon, isActive)}
                      <span>${link.label}</span>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </nav>
      </div>

      <!-- Bottom Actions -->
      <div class="p-4 border-t border-[#1A233A] space-y-2 shrink-0 bg-[#030711] sticky bottom-0">
        <a href="#/" target="_blank" class="w-full py-2.5 px-3 rounded-xl bg-transparent border border-cyan-900 hover:bg-[#111C35] text-[12px] font-bold text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
          <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          <span>View Live Site</span>
        </a>
        <button id="admin-logout-btn" class="w-full py-2.5 px-3 rounded-xl bg-[#2A0F1A] border border-[#4A162B] hover:bg-rose-900/50 text-[12px] text-rose-400 hover:text-rose-300 font-bold transition-all flex items-center gap-2">
          <svg class="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  `;
}

export function initAdminSidebarEvents() {
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await api.logout();
      window.location.hash = '#/admin/login';
    };
  }
}

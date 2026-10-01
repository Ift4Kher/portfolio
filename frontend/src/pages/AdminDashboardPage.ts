import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';

export async function renderAdminDashboardPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const stats = await api.getDashboardStats();
    const messages = await api.getMessages();

    const allProjects = await api.getProjects();
    const recentProjects = allProjects.slice(0, 5);
    const recentMessages = messages.slice(0, 5);

    const todayDate = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
    const timeNow = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
            <!-- Header Row -->
            <div class="flex items-start justify-between">
              <div>
                <span class="text-xs font-bold tracking-widest text-[#00D9FF] uppercase">Overview</span>
                <h2 class="text-2xl sm:text-3xl font-black text-white mt-1 mb-2">Dashboard</h2>
                <p class="text-[13px] text-slate-400">Manage your portfolio content, projects, and site configuration from one place.</p>
              </div>
              <div class="hidden sm:flex items-center gap-3 bg-[#0A1223] border border-[#1A233A] rounded-xl px-4 py-3">
                <div class="w-8 h-8 rounded-lg bg-[#111C35] flex items-center justify-center text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[13px] font-bold text-white">${todayDate}</span>
                  <span class="text-[10px] text-slate-400 font-mono">Last updated: ${timeNow}</span>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <!-- Total Projects -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-[#00D9FF]/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Total Projects</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.totalProjects}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-emerald-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                      <span>+2 this month</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-cyan-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,25 L20,20 L40,22 L60,10 L80,15 L100,5" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Published Projects -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-emerald-500/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Published Projects</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.publishedProjects}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-emerald-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                      <span>100% published</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-emerald-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,28 L20,25 L40,20 L60,15 L80,10 L100,5" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Featured Projects -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-purple-500/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.583 9.408a.998.998 0 0 0-.825-.568l-6.208-.574-2.483-5.753c-.156-.36-.499-.588-.867-.588s-.711.228-.867.588l-2.483 5.753-6.208.574a1.002 1.002 0 0 0-.585 1.761l4.733 4.148-1.391 6.096a.997.997 0 0 0 1.482 1.077l5.319-3.133 5.32 3.133a.999.999 0 0 0 1.517-.866l-.16-1.558 1.428-1.118a1 1 0 0 0 .167-1.422l-1.89-2.392z"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Featured Projects</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.featuredProjects}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-purple-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      <span>3D carousel</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-purple-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,28 L20,28 L40,28 L60,28 L80,25 L100,25" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Services -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-amber-500/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.707 2.293A.997.997 0 0 0 11 2H6a.999.999 0 0 0-.53.151l-4 3A1.003 1.003 0 0 0 1 6v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a.999.999 0 0 0-.387-.79l-6-5a.999.999 0 0 0-1.12-.058l-3.786 2.14-1.393-.14zm-4.121 2.293L10 2.586l1.293 1.293-2.414 2.414L6 3.414zm9.414-2.586 4 3.333V20H3V7.228l3.189-2.392L9.414 8h5.172l2.414-2.414L15.586 4zM13 14h-2v2h2v-2zm-4 0H7v2h2v-2zm8 0h-2v2h2v-2z"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Services</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.totalServices}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-emerald-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                      <span>Active services</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-amber-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,25 L20,27 L40,20 L60,22 L80,10 L100,5" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Skills -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-blue-500/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Skills</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.totalSkills}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-blue-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      <span>Technologies</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-blue-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,25 L20,25 L40,28 L60,18 L80,20 L100,8" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Unread Messages -->
              <div class="bg-[#0A1223] rounded-2xl p-5 border border-[#1A233A] hover:border-rose-500/30 transition-colors flex flex-col justify-between group">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/></svg>
                    </div>
                    <span class="text-[13px] font-medium text-slate-300">Unread Messages</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
                <div class="flex items-end justify-between">
                  <div>
                    <span class="text-3xl font-black text-white font-mono">${stats.unreadMessages}</span>
                    <div class="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-rose-400">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                      <span>No unread messages</span>
                    </div>
                  </div>
                  <div class="w-24 h-10 opacity-70">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-rose-400" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M0,28 L20,28 L40,29 L60,28 L80,27 L100,28" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              <!-- Recent Projects Table -->
              <div class="xl:col-span-2 bg-[#0A1223] rounded-2xl border border-[#1A233A] flex flex-col overflow-hidden">
                <div class="p-5 border-b border-[#1A233A] flex items-center justify-between bg-[#0B1426]">
                  <div class="flex items-center gap-2 text-white">
                    <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    <h2 class="text-[14px] font-bold">Recent Projects</h2>
                  </div>
                  <a href="#/admin/projects" class="text-[12px] font-bold text-[#00D9FF] hover:text-white transition-colors flex items-center gap-1">
                    View all <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs">
                    <thead class="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-[#080E1A]">
                      <tr>
                        <th class="px-5 py-3 font-medium">Project</th>
                        <th class="px-5 py-3 font-medium">Category</th>
                        <th class="px-5 py-3 font-medium">Technologies</th>
                        <th class="px-5 py-3 font-medium">Status</th>
                        <th class="px-5 py-3 font-medium">Updated</th>
                        <th class="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#1A233A]">
                      ${recentProjects.map(p => `
                        <tr class="hover:bg-[#111C35]/50 transition-colors group">
                          <td class="px-5 py-3">
                            <div class="flex items-center gap-3">
                              <img src="${p.coverImage}" alt="${p.title}" class="w-10 h-7 object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity" onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'" />
                              <div class="flex flex-col">
                                <span class="font-bold text-white text-[13px]">${p.title}</span>
                                <span class="text-[11px] text-slate-500 line-clamp-1 max-w-[150px]">${p.shortDescription}</span>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-3">
                            <span class="px-2.5 py-1 rounded-md bg-[#2E1A4A] text-[#A855F7] text-[10px] font-bold tracking-wide">${p.categoriesList?.[0] || 'App'}</span>
                          </td>
                          <td class="px-5 py-3">
                            <div class="flex items-center gap-1.5">
                              ${(p.technologiesList || []).slice(0,3).map(t => `<span class="px-2 py-0.5 rounded bg-[#1A233A] border border-[#2A344A] text-slate-300 text-[10px]">${t}</span>`).join('')}
                              ${(p.technologiesList && p.technologiesList.length > 3) ? `<span class="px-1.5 py-0.5 rounded bg-[#111C35] text-cyan-400 text-[10px] font-bold border border-cyan-900/30">+${p.technologiesList.length - 3}</span>` : ''}
                            </div>
                          </td>
                          <td class="px-5 py-3">
                            ${p.published 
                              ? `<span class="px-2.5 py-1 rounded-md bg-[#064E3B] text-[#34D399] text-[10px] font-bold">Published</span>` 
                              : `<span class="px-2.5 py-1 rounded-md bg-[#451A1A] text-[#F87171] text-[10px] font-bold">Draft</span>`}
                          </td>
                          <td class="px-5 py-3 text-[11px] text-slate-400 font-mono">
                            ${new Date(p.updatedAt).toLocaleDateString()}
                          </td>
                          <td class="px-5 py-3 text-right">
                            <button class="p-1 rounded text-slate-500 hover:text-white hover:bg-[#1A233A] transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] flex flex-col">
                <div class="p-5 border-b border-[#1A233A] flex items-center gap-2 text-white bg-[#0B1426]">
                  <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  <h2 class="text-[14px] font-bold">Quick Actions</h2>
                </div>
                <div class="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
                  <a href="#/admin/projects/create" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Create Project</span>
                        <span class="text-[10px] text-slate-500">Add a new project to your portfolio</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>
                  
                  <a href="#/admin/projects" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-blue-400 transition-colors">Manage Projects</span>
                        <span class="text-[10px] text-slate-500">Edit, delete or reorder projects</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>

                  <a href="#/admin/carousel" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-purple-400 transition-colors">Reorder 3D Carousel</span>
                        <span class="text-[10px] text-slate-500">Update carousel project order</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>

                  <a href="#/admin/hero" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">Edit Hero</span>
                        <span class="text-[10px] text-slate-500">Update hero section content</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>

                  <a href="#/admin/services" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">Manage Services</span>
                        <span class="text-[10px] text-slate-500">Add or update your services</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>

                  <a href="#/admin/messages" class="flex items-center justify-between p-3 rounded-xl hover:bg-[#111C35] transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-[13px] font-bold text-slate-200 group-hover:text-rose-400 transition-colors">View Messages</span>
                        <span class="text-[10px] text-slate-500">Check contact form messages</span>
                      </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Bottom Row -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              <!-- Portfolio Activity Chart (Static mock) -->
              <div class="xl:col-span-2 bg-[#0A1223] rounded-2xl border border-[#1A233A] flex flex-col p-5">
                <div class="flex items-center gap-2 text-white mb-6">
                  <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
                  <h2 class="text-[14px] font-bold">Portfolio Activity</h2>
                  <div class="ml-auto flex bg-[#111C35] rounded-lg p-1">
                    <button class="px-3 py-1 rounded-md bg-cyan-500 text-white text-[10px] font-bold">7D</button>
                    <button class="px-3 py-1 rounded-md text-slate-400 hover:text-white text-[10px] font-bold">30D</button>
                    <button class="px-3 py-1 rounded-md text-slate-400 hover:text-white text-[10px] font-bold">90D</button>
                  </div>
                </div>
                
                <div class="flex-1 flex items-end gap-2 text-[10px] text-slate-500 font-mono relative">
                  <!-- Chart Y axis -->
                  <div class="flex flex-col justify-between h-full pr-4 pb-6 absolute left-0 top-0 bottom-0">
                    <span>8</span>
                    <span>6</span>
                    <span>4</span>
                    <span>2</span>
                    <span>0</span>
                  </div>
                  <!-- Line Chart Mock -->
                  <div class="w-full h-full pl-8 pb-6 relative">
                    <svg viewBox="0 0 400 100" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path d="M 0,80 L 60,60 L 120,40 L 180,60 L 240,70 L 300,50 L 360,60 L 400,20" fill="none" stroke="#00D9FF" stroke-width="2" />
                      <circle cx="0" cy="80" r="3" fill="#00D9FF" />
                      <circle cx="60" cy="60" r="3" fill="#00D9FF" />
                      <circle cx="120" cy="40" r="3" fill="#00D9FF" />
                      <circle cx="180" cy="60" r="3" fill="#00D9FF" />
                      <circle cx="240" cy="70" r="3" fill="#00D9FF" />
                      <circle cx="300" cy="50" r="3" fill="#00D9FF" />
                      <circle cx="360" cy="60" r="3" fill="#00D9FF" />
                      <circle cx="400" cy="20" r="3" fill="#00D9FF" />
                      
                      <!-- X axis labels -->
                      <text x="0" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 18</text>
                      <text x="60" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 19</text>
                      <text x="120" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 20</text>
                      <text x="180" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 21</text>
                      <text x="240" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 22</text>
                      <text x="300" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 23</text>
                      <text x="360" y="115" fill="#64748B" font-size="10" font-family="monospace">Apr 24</text>
                    </svg>
                  </div>
                </div>

                <!-- Small Stats underneath chart -->
                <div class="grid grid-cols-2 gap-4 mt-6 border-t border-[#1A233A] pt-4">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-[#00D9FF]"></div>
                    <span class="text-[12px] text-slate-300">Projects Added</span>
                    <span class="ml-auto font-bold text-white text-[13px]">2</span>
                    <span class="text-[10px] text-emerald-400 font-mono ml-2">+1</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span class="text-[12px] text-slate-300">Projects Published</span>
                    <span class="ml-auto font-bold text-white text-[13px]">3</span>
                    <span class="text-[10px] text-emerald-400 font-mono ml-2">+1</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-rose-400"></div>
                    <span class="text-[12px] text-slate-300">Messages Received</span>
                    <span class="ml-auto font-bold text-white text-[13px]">0</span>
                    <span class="text-[10px] text-slate-500 font-mono ml-2">—</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span class="text-[12px] text-slate-300">Content Updates</span>
                    <span class="ml-auto font-bold text-white text-[13px]">5</span>
                    <span class="text-[10px] text-emerald-400 font-mono ml-2">+2</span>
                  </div>
                </div>
              </div>

              <!-- Recent Inquiries -->
              <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] flex flex-col p-5">
                <div class="flex items-center justify-between text-white mb-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <h2 class="text-[14px] font-bold">Recent Inquiries</h2>
                  </div>
                  <a href="#/admin/messages" class="text-[10px] font-bold text-[#00D9FF] hover:text-white transition-colors flex items-center gap-1">
                    View all <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>
                
                <div class="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-8">
                  <div class="w-12 h-12 rounded-full bg-[#111C35] flex items-center justify-center text-slate-500 mb-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                  </div>
                  <span class="text-[13px] font-bold text-white">No new inquiries</span>
                  <span class="text-[11px] text-slate-500 max-w-[200px]">Messages from your contact form will appear here.</span>
                  <a href="#/admin/messages" class="mt-4 px-4 py-1.5 rounded-lg border border-[#1A233A] hover:bg-[#1A233A] transition-colors text-[#00D9FF] text-[11px] font-bold flex items-center gap-1.5">
                    View Inbox <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();
  } catch {
    window.location.hash = '#/admin/login';
  }
}

import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';

export async function renderAdminProjectsPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const projects = await api.getProjects('All', '');

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/projects')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Project Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">All Projects (${projects.length})</h2>
                <p class="text-xs text-slate-400">Create, edit, toggle visibility, and feature projects in 3D carousel.</p>
              </div>

              <a href="#/admin/projects/create" class="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                <span>➕</span>
                <span>Create New Project</span>
              </a>
            </div>

            <!-- Projects Table -->
            <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs font-mono">
                  <thead class="bg-[#111C35]/90 text-slate-400 border-b border-slate-800 uppercase">
                    <tr>
                      <th class="p-4">Cover</th>
                      <th class="p-4">Title</th>
                      <th class="p-4">Category</th>
                      <th class="p-4">3D Carousel</th>
                      <th class="p-4">Visibility</th>
                      <th class="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60">
                    ${projects.map(p => `
                      <tr class="hover:bg-[#111C35]/50 transition-colors">
                        <td class="p-4">
                          <img src="${p.coverImage}" alt="${p.title}" class="w-16 h-10 object-cover rounded-lg border border-slate-700 bg-slate-950" onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"/>
                        </td>
                        <td class="p-4">
                          <div class="flex flex-col">
                            <span class="font-bold text-white text-sm line-clamp-1">${p.title}</span>
                            <span class="text-[10px] text-slate-400">/${p.slug}</span>
                          </div>
                        </td>
                        <td class="p-4">
                          <span class="px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                            ${p.categoriesList && p.categoriesList[0] ? p.categoriesList[0] : 'Full Stack'}
                          </span>
                        </td>
                        <td class="p-4">
                          <button 
                            class="toggle-featured-btn px-3 py-1 rounded text-[10px] font-bold transition-all ${p.featured ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}"
                            data-id="${p.id}"
                          >
                            ${p.featured ? '★ Featured (#' + p.carouselOrder + ')' : 'Normal'}
                          </button>
                        </td>
                        <td class="p-4">
                          <button 
                            class="toggle-publish-btn px-3 py-1 rounded text-[10px] font-bold transition-all ${p.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'}"
                            data-id="${p.id}"
                          >
                            ${p.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td class="p-4 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <a href="#/admin/projects/edit/${p.id}" class="px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all">
                              Edit
                            </a>
                            <button class="delete-project-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all" data-id="${p.id}" data-title="${p.title}">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    // Toggle Publish Listener
    document.querySelectorAll('.toggle-publish-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        await api.toggleProjectPublish(id);
        renderAdminProjectsPage(container);
      };
    });

    // Toggle Featured Listener
    document.querySelectorAll('.toggle-featured-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        await api.toggleProjectFeatured(id);
        renderAdminProjectsPage(container);
      };
    });

    // Delete Project Listener with confirmation
    document.querySelectorAll('.delete-project-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const title = btn.getAttribute('data-title')!;
        if (confirm(`Are you sure you want to delete project "${title}"? This cannot be undone.`)) {
          await api.deleteProject(id);
          renderAdminProjectsPage(container);
        }
      };
    });
  } catch {
    window.location.hash = '#/admin/login';
  }
}

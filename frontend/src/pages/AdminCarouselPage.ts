import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { ProjectItem } from '../types';

let featuredProjects: ProjectItem[] = [];

export async function renderAdminCarouselPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    featuredProjects = await api.getFeaturedProjects();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/carousel')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('3D Carousel Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A] space-y-2">
              <h2 class="text-xl font-bold text-white font-mono flex items-center gap-2">
                <span>✨</span>
                <span>Featured Projects Carousel Order (${featuredProjects.length})</span>
              </h2>
              <p class="text-xs text-slate-400 leading-relaxed">
                Drag or use action buttons to rearrange the 3D carousel presentation order on the homepage. Position #1 will appear front & center on initial page load.
              </p>
            </div>

            <div id="carousel-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

            <!-- Drag & Drop Order List -->
            <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] overflow-hidden">
              <div id="carousel-items-list" class="divide-y divide-slate-800/80">
                ${featuredProjects.map((p, idx) => `
                  <div 
                    class="carousel-drag-item p-4 bg-[#111C35]/60 hover:bg-[#111C35] transition-colors flex items-center justify-between gap-4 cursor-grab active:cursor-grabbing"
                    draggable="true"
                    data-id="${p.id}"
                    data-index="${idx}"
                  >
                    <div class="flex items-center gap-4">
                      <!-- Position Badge -->
                      <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                        #${idx + 1}
                      </div>

                      <!-- Drag Handle Icon -->
                      <span class="text-slate-500 text-lg select-none">☰</span>

                      <!-- Project Cover Image -->
                      <img src="${p.coverImage}" alt="${p.title}" class="w-14 h-9 object-cover rounded-md border border-slate-700 bg-slate-950" onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"/>

                      <!-- Title & Info -->
                      <div class="flex flex-col">
                        <span class="font-bold text-white text-sm line-clamp-1">${p.title}</span>
                        <span class="text-[10px] text-slate-400 font-mono">${p.categoriesList && p.categoriesList[0] ? p.categoriesList[0] : 'Full Stack'} • Order: ${p.carouselOrder}</span>
                      </div>
                    </div>

                    <!-- Action Controls -->
                    <div class="flex items-center gap-2">
                      <button class="move-up-btn p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700 disabled:opacity-30" ${idx === 0 ? 'disabled' : ''} data-index="${idx}" title="Move Up">
                        ▲
                      </button>
                      <button class="move-down-btn p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700 disabled:opacity-30" ${idx === featuredProjects.length - 1 ? 'disabled' : ''} data-index="${idx}" title="Move Down">
                        ▼
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Save Order Action Bar -->
            <div class="flex items-center justify-between bg-[#0A1223] p-4 rounded-2xl border border-[#1A233A]">
              <span class="text-xs font-mono text-slate-400">Order changes save instantly to the database.</span>
              <button id="save-carousel-order-btn" class="px-6 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all">
                Save & Update Homepage 3D Carousel
              </button>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    // Attach Move Up & Move Down listeners
    document.querySelectorAll('.move-up-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const idx = parseInt(btn.getAttribute('data-index')!);
        if (idx > 0) {
          const temp = featuredProjects[idx];
          featuredProjects[idx] = featuredProjects[idx - 1];
          featuredProjects[idx - 1] = temp;
          await saveOrder();
        }
      };
    });

    document.querySelectorAll('.move-down-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const idx = parseInt(btn.getAttribute('data-index')!);
        if (idx < featuredProjects.length - 1) {
          const temp = featuredProjects[idx];
          featuredProjects[idx] = featuredProjects[idx + 1];
          featuredProjects[idx + 1] = temp;
          await saveOrder();
        }
      };
    });

    // HTML5 Drag and Drop events
    const list = document.getElementById('carousel-items-list');
    let dragSrcIndex: number | null = null;

    if (list) {
      const items = list.querySelectorAll<HTMLElement>('.carousel-drag-item');
      items.forEach(item => {
        item.ondragstart = (e) => {
          dragSrcIndex = parseInt(item.getAttribute('data-index')!);
          item.classList.add('drag-item-dragging');
          if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
        };

        item.ondragend = () => {
          item.classList.remove('drag-item-dragging');
        };

        item.ondragover = (e) => {
          e.preventDefault();
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        };

        item.ondrop = async (e) => {
          e.preventDefault();
          const targetIndex = parseInt(item.getAttribute('data-index')!);
          if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
            const moved = featuredProjects.splice(dragSrcIndex, 1)[0];
            featuredProjects.splice(targetIndex, 0, moved);
            await saveOrder();
          }
        };
      });
    }

    const saveBtn = document.getElementById('save-carousel-order-btn');
    if (saveBtn) {
      saveBtn.onclick = () => saveOrder();
    }

    async function saveOrder() {
      const payload = featuredProjects.map((p, index) => ({
        id: p.id,
        carouselOrder: index + 1
      }));

      try {
        await api.reorderCarousel(payload);
        const alert = document.getElementById('carousel-alert');
        if (alert) {
          alert.classList.remove('hidden', 'bg-rose-500/20', 'text-rose-400');
          alert.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/40');
          alert.textContent = '3D Carousel project order saved successfully!';
          setTimeout(() => alert.classList.add('hidden'), 3000);
        }
        renderAdminCarouselPage(container);
      } catch (err: any) {
        alert('Failed to save carousel order: ' + err.message);
      }
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

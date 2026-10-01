import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { ServiceItem } from '../types';

export async function renderAdminServicesPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const services = await api.getServices();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/services')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Services Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">Services Offered (${services.length})</h2>
                <p class="text-xs text-slate-400">Manage technical services displayed on the portfolio homepage.</p>
              </div>

              <button id="add-service-btn" class="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                <span>➕</span>
                <span>Add New Service</span>
              </button>
            </div>

            <!-- Modal for Add/Edit -->
            <div id="service-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-lg bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-6 shadow-2xl">
                <div class="flex items-center justify-between border-b border-[#1A233A] pb-3">
                  <h3 id="modal-title" class="text-lg font-bold text-white font-mono">Add Service</h3>
                  <button id="close-modal-btn" class="text-slate-400 hover:text-white">✕</button>
                </div>

                <form id="service-form" class="space-y-4">
                  <input type="hidden" id="s-id"/>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Title *</label>
                    <input type="text" id="s-title" required class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Description *</label>
                    <textarea id="s-description" required rows="3" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none"></textarea>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Icon Key</label>
                      <input type="text" id="s-icon" placeholder="code, layout, server, zap" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Display Order</label>
                      <input type="number" id="s-order" value="0" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                  </div>
                  <div class="pt-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="s-published" checked class="w-4 h-4 text-cyan-500 rounded border-slate-700 bg-[#111C35]"/>
                      <span class="text-xs font-mono text-slate-300">Published</span>
                    </label>
                  </div>

                  <div class="pt-4 flex justify-end gap-3">
                    <button type="button" id="cancel-modal-btn" class="px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-slate-300 text-xs font-mono">Cancel</button>
                    <button type="submit" class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-mono font-semibold">Save Service</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Services Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${services.map(s => `
                <div class="bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-4 flex flex-col justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-1 rounded text-[10px] font-mono font-bold ${s.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                        ${s.published ? 'Published' : 'Draft'}
                      </span>
                      <span class="text-xs font-mono text-slate-500">Order: ${s.displayOrder}</span>
                    </div>
                    <h3 class="text-lg font-bold text-white font-mono">${s.title}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed font-normal">${s.description}</p>
                  </div>

                  <div class="pt-4 border-t border-[#1A233A] flex items-center justify-end gap-2">
                    <button class="edit-service-btn px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono" data-json="${encodeURIComponent(JSON.stringify(s))}">Edit</button>
                    <button class="delete-service-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono" data-id="${s.id}" data-title="${s.title}">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form') as HTMLFormElement;

    document.getElementById('add-service-btn')!.onclick = () => {
      (document.getElementById('modal-title')!).textContent = 'Add New Service';
      (document.getElementById('s-id') as HTMLInputElement).value = '';
      (document.getElementById('s-title') as HTMLInputElement).value = '';
      (document.getElementById('s-description') as HTMLTextAreaElement).value = '';
      (document.getElementById('s-icon') as HTMLInputElement).value = 'code';
      (document.getElementById('s-order') as HTMLInputElement).value = String(services.length + 1);
      (document.getElementById('s-published') as HTMLInputElement).checked = true;
      modal?.classList.remove('hidden');
    };

    document.getElementById('close-modal-btn')!.onclick = () => modal?.classList.add('hidden');
    document.getElementById('cancel-modal-btn')!.onclick = () => modal?.classList.add('hidden');

    document.querySelectorAll('.edit-service-btn').forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        const item: ServiceItem = JSON.parse(decodeURIComponent(btn.getAttribute('data-json')!));
        (document.getElementById('modal-title')!).textContent = 'Edit Service';
        (document.getElementById('s-id') as HTMLInputElement).value = item.id;
        (document.getElementById('s-title') as HTMLInputElement).value = item.title;
        (document.getElementById('s-description') as HTMLTextAreaElement).value = item.description;
        (document.getElementById('s-icon') as HTMLInputElement).value = item.icon;
        (document.getElementById('s-order') as HTMLInputElement).value = String(item.displayOrder);
        (document.getElementById('s-published') as HTMLInputElement).checked = item.published;
        modal?.classList.remove('hidden');
      };
    });

    document.querySelectorAll('.delete-service-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const title = btn.getAttribute('data-title')!;
        if (confirm(`Delete service "${title}"?`)) {
          await api.deleteService(id);
          renderAdminServicesPage(container);
        }
      };
    });

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = (document.getElementById('s-id') as HTMLInputElement).value;
        const payload = {
          title: (document.getElementById('s-title') as HTMLInputElement).value.trim(),
          description: (document.getElementById('s-description') as HTMLTextAreaElement).value.trim(),
          icon: (document.getElementById('s-icon') as HTMLInputElement).value.trim() || 'code',
          displayOrder: parseInt((document.getElementById('s-order') as HTMLInputElement).value) || 0,
          published: (document.getElementById('s-published') as HTMLInputElement).checked
        };

        if (id) {
          await api.updateService(id, payload);
        } else {
          await api.createService(payload);
        }
        modal?.classList.add('hidden');
        renderAdminServicesPage(container);
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

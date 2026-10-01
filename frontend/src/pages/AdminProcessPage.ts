import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { ProcessStepItem } from '../types';

export async function renderAdminProcessPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const steps = await api.getProcessSteps();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/process')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Development Process Steps Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">Process Steps (${steps.length})</h2>
                <p class="text-xs text-slate-400">Manage methodology steps displayed on the portfolio homepage.</p>
              </div>

              <button id="add-proc-btn" class="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                <span>➕</span>
                <span>Add Process Step</span>
              </button>
            </div>

            <!-- Modal -->
            <div id="proc-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-lg bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-6 shadow-2xl">
                <div class="flex items-center justify-between border-b border-[#1A233A] pb-3">
                  <h3 id="proc-modal-title" class="text-lg font-bold text-white font-mono">Add Process Step</h3>
                  <button id="close-proc-modal" class="text-slate-400 hover:text-white">✕</button>
                </div>

                <form id="proc-form" class="space-y-4">
                  <input type="hidden" id="p-id"/>
                  <div class="grid grid-cols-3 gap-4">
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Step # *</label>
                      <input type="text" id="p-stepNumber" required placeholder="01" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="space-y-1 col-span-2">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Step Title *</label>
                      <input type="text" id="p-title" required placeholder="e.g. Discover & Plan" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Description *</label>
                    <textarea id="p-description" required rows="3" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none"></textarea>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Display Order</label>
                      <input type="number" id="p-order" value="0" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="pt-6">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="p-published" checked class="w-4 h-4 text-cyan-500 rounded border-slate-700 bg-[#111C35]"/>
                        <span class="text-xs font-mono text-slate-300">Published</span>
                      </label>
                    </div>
                  </div>

                  <div class="pt-4 flex justify-end gap-3">
                    <button type="button" id="cancel-proc-modal" class="px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-slate-300 text-xs font-mono">Cancel</button>
                    <button type="submit" class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-mono font-semibold">Save Step</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- List Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${steps.map(step => `
                <div class="bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-4 flex flex-col justify-between">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl font-mono font-extrabold text-cyan-400">${step.stepNumber}</span>
                      <span class="px-2.5 py-1 rounded text-[10px] font-mono font-bold ${step.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                        ${step.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-white font-mono">${step.title}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed font-normal">${step.description}</p>
                  </div>

                  <div class="pt-4 border-t border-[#1A233A] flex items-center justify-end gap-2">
                    <button class="edit-proc-btn px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono" data-json="${encodeURIComponent(JSON.stringify(step))}">Edit</button>
                    <button class="delete-proc-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono" data-id="${step.id}" data-title="${step.title}">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const modal = document.getElementById('proc-modal');
    const form = document.getElementById('proc-form') as HTMLFormElement;

    document.getElementById('add-proc-btn')!.onclick = () => {
      (document.getElementById('proc-modal-title')!).textContent = 'Add Process Step';
      (document.getElementById('p-id') as HTMLInputElement).value = '';
      (document.getElementById('p-stepNumber') as HTMLInputElement).value = `0${steps.length + 1}`;
      (document.getElementById('p-title') as HTMLInputElement).value = '';
      (document.getElementById('p-description') as HTMLTextAreaElement).value = '';
      (document.getElementById('p-order') as HTMLInputElement).value = String(steps.length + 1);
      (document.getElementById('p-published') as HTMLInputElement).checked = true;
      modal?.classList.remove('hidden');
    };

    document.getElementById('close-proc-modal')!.onclick = () => modal?.classList.add('hidden');
    document.getElementById('cancel-proc-modal')!.onclick = () => modal?.classList.add('hidden');

    document.querySelectorAll('.edit-proc-btn').forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        const item: ProcessStepItem = JSON.parse(decodeURIComponent(btn.getAttribute('data-json')!));
        (document.getElementById('proc-modal-title')!).textContent = 'Edit Process Step';
        (document.getElementById('p-id') as HTMLInputElement).value = item.id;
        (document.getElementById('p-stepNumber') as HTMLInputElement).value = item.stepNumber;
        (document.getElementById('p-title') as HTMLInputElement).value = item.title;
        (document.getElementById('p-description') as HTMLTextAreaElement).value = item.description;
        (document.getElementById('p-order') as HTMLInputElement).value = String(item.displayOrder);
        (document.getElementById('p-published') as HTMLInputElement).checked = item.published;
        modal?.classList.remove('hidden');
      };
    });

    document.querySelectorAll('.delete-proc-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const title = btn.getAttribute('data-title')!;
        if (confirm(`Delete process step "${title}"?`)) {
          await api.deleteProcessStep(id);
          renderAdminProcessPage(container);
        }
      };
    });

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = (document.getElementById('p-id') as HTMLInputElement).value;
        const payload = {
          stepNumber: (document.getElementById('p-stepNumber') as HTMLInputElement).value.trim(),
          title: (document.getElementById('p-title') as HTMLInputElement).value.trim(),
          description: (document.getElementById('p-description') as HTMLTextAreaElement).value.trim(),
          displayOrder: parseInt((document.getElementById('p-order') as HTMLInputElement).value) || 0,
          published: (document.getElementById('p-published') as HTMLInputElement).checked
        };

        if (id) {
          await api.updateProcessStep(id, payload);
        } else {
          await api.createProcessStep(payload);
        }
        modal?.classList.add('hidden');
        renderAdminProcessPage(container);
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

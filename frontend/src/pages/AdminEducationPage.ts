import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { EducationItem } from '../types';

export async function renderAdminEducationPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const education = await api.getEducation();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/education')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Education Timeline Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">Education Entries (${education.length})</h2>
                <p class="text-xs text-slate-400">Manage academic degrees, institutions, CGPA, and dates.</p>
              </div>

              <button id="add-edu-btn" class="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                <span>➕</span>
                <span>Add Education Entry</span>
              </button>
            </div>

            <!-- Modal -->
            <div id="edu-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-lg bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-6 shadow-2xl">
                <div class="flex items-center justify-between border-b border-[#1A233A] pb-3">
                  <h3 id="edu-modal-title" class="text-lg font-bold text-white font-mono">Add Education</h3>
                  <button id="close-edu-modal" class="text-slate-400 hover:text-white">✕</button>
                </div>

                <form id="edu-form" class="space-y-4">
                  <input type="hidden" id="e-id"/>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Degree Title *</label>
                    <input type="text" id="e-degree" required placeholder="e.g. BSc in Computer Science & Engineering" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Institution Name *</label>
                    <input type="text" id="e-institution" required placeholder="e.g. Eastern University" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="grid grid-cols-3 gap-3">
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Result / CGPA</label>
                      <input type="text" id="e-result" placeholder="CGPA: 2.72" class="w-full px-3 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Start Year *</label>
                      <input type="text" id="e-start" required placeholder="2020" class="w-full px-3 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">End Year</label>
                      <input type="text" id="e-end" placeholder="2024" class="w-full px-3 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono focus:border-cyan-500"/>
                    </div>
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Description</label>
                    <textarea id="e-description" rows="3" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none"></textarea>
                  </div>
                  <div>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="e-published" checked class="w-4 h-4 text-cyan-500 rounded border-slate-700 bg-[#111C35]"/>
                      <span class="text-xs font-mono text-slate-300">Published</span>
                    </label>
                  </div>

                  <div class="pt-4 flex justify-end gap-3">
                    <button type="button" id="cancel-edu-modal" class="px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-slate-300 text-xs font-mono">Cancel</button>
                    <button type="submit" class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-mono font-semibold">Save Entry</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- List Cards -->
            <div class="space-y-4">
              ${education.map(e => `
                <div class="bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-3">
                      <span class="text-xs font-mono text-cyan-400 font-bold">${e.startDate} — ${e.endDate}</span>
                      ${e.result ? `<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">${e.result}</span>` : ''}
                    </div>
                    <h3 class="text-lg font-bold text-white font-mono">${e.degree}</h3>
                    <h4 class="text-xs font-semibold text-slate-400 font-mono">${e.institution}</h4>
                  </div>

                  <div class="flex items-center gap-2">
                    <button class="edit-edu-btn px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono" data-json="${encodeURIComponent(JSON.stringify(e))}">Edit</button>
                    <button class="delete-edu-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono" data-id="${e.id}" data-degree="${e.degree}">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const modal = document.getElementById('edu-modal');
    const form = document.getElementById('edu-form') as HTMLFormElement;

    document.getElementById('add-edu-btn')!.onclick = () => {
      (document.getElementById('edu-modal-title')!).textContent = 'Add Education Entry';
      (document.getElementById('e-id') as HTMLInputElement).value = '';
      (document.getElementById('e-degree') as HTMLInputElement).value = '';
      (document.getElementById('e-institution') as HTMLInputElement).value = '';
      (document.getElementById('e-result') as HTMLInputElement).value = 'CGPA: 3.50';
      (document.getElementById('e-start') as HTMLInputElement).value = '2020';
      (document.getElementById('e-end') as HTMLInputElement).value = '2024';
      (document.getElementById('e-description') as HTMLTextAreaElement).value = '';
      (document.getElementById('e-published') as HTMLInputElement).checked = true;
      modal?.classList.remove('hidden');
    };

    document.getElementById('close-edu-modal')!.onclick = () => modal?.classList.add('hidden');
    document.getElementById('cancel-edu-modal')!.onclick = () => modal?.classList.add('hidden');

    document.querySelectorAll('.edit-edu-btn').forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        const item: EducationItem = JSON.parse(decodeURIComponent(btn.getAttribute('data-json')!));
        (document.getElementById('edu-modal-title')!).textContent = 'Edit Education Entry';
        (document.getElementById('e-id') as HTMLInputElement).value = item.id;
        (document.getElementById('e-degree') as HTMLInputElement).value = item.degree;
        (document.getElementById('e-institution') as HTMLInputElement).value = item.institution;
        (document.getElementById('e-result') as HTMLInputElement).value = item.result || '';
        (document.getElementById('e-start') as HTMLInputElement).value = item.startDate;
        (document.getElementById('e-end') as HTMLInputElement).value = item.endDate;
        (document.getElementById('e-description') as HTMLTextAreaElement).value = item.description || '';
        (document.getElementById('e-published') as HTMLInputElement).checked = item.published;
        modal?.classList.remove('hidden');
      };
    });

    document.querySelectorAll('.delete-edu-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const degree = btn.getAttribute('data-degree')!;
        if (confirm(`Delete education "${degree}"?`)) {
          await api.deleteEducation(id);
          renderAdminEducationPage(container);
        }
      };
    });

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = (document.getElementById('e-id') as HTMLInputElement).value;
        const payload = {
          degree: (document.getElementById('e-degree') as HTMLInputElement).value.trim(),
          institution: (document.getElementById('e-institution') as HTMLInputElement).value.trim(),
          result: (document.getElementById('e-result') as HTMLInputElement).value.trim(),
          startDate: (document.getElementById('e-start') as HTMLInputElement).value.trim(),
          endDate: (document.getElementById('e-end') as HTMLInputElement).value.trim() || 'Present',
          description: (document.getElementById('e-description') as HTMLTextAreaElement).value.trim(),
          published: (document.getElementById('e-published') as HTMLInputElement).checked
        };

        if (id) {
          await api.updateEducation(id, payload);
        } else {
          await api.createEducation(payload);
        }
        modal?.classList.add('hidden');
        renderAdminEducationPage(container);
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

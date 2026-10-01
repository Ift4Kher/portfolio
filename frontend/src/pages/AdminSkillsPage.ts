import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { SkillItem } from '../types';

export async function renderAdminSkillsPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const skills = await api.getSkills();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/skills')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Skills Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">Technical Skills (${skills.length})</h2>
                <p class="text-xs text-slate-400">Manage technical stack items and categories.</p>
              </div>

              <button id="add-skill-btn" class="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all flex items-center justify-center gap-2">
                <span>➕</span>
                <span>Add Skill</span>
              </button>
            </div>

            <!-- Modal -->
            <div id="skill-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-md bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-6 shadow-2xl">
                <div class="flex items-center justify-between border-b border-[#1A233A] pb-3">
                  <h3 id="skill-modal-title" class="text-lg font-bold text-white font-mono">Add Skill</h3>
                  <button id="close-skill-modal" class="text-slate-400 hover:text-white">✕</button>
                </div>

                <form id="skill-form" class="space-y-4">
                  <input type="hidden" id="sk-id"/>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Skill Name *</label>
                    <input type="text" id="sk-name" required placeholder="e.g. TypeScript" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-1">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Category *</label>
                    <select id="sk-category" required class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500">
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Proficiency (1-100)</label>
                      <input type="number" id="sk-proficiency" value="90" min="1" max="100" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                    <div class="space-y-1">
                      <label class="block text-xs font-mono text-slate-300 uppercase">Display Order</label>
                      <input type="number" id="sk-order" value="0" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    </div>
                  </div>
                  <div>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" id="sk-published" checked class="w-4 h-4 text-cyan-500 rounded border-slate-700 bg-[#111C35]"/>
                      <span class="text-xs font-mono text-slate-300">Published</span>
                    </label>
                  </div>

                  <div class="pt-4 flex justify-end gap-3">
                    <button type="button" id="cancel-skill-modal" class="px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-slate-300 text-xs font-mono">Cancel</button>
                    <button type="submit" class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-mono font-semibold">Save Skill</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Table -->
            <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs font-mono">
                  <thead class="bg-[#111C35]/90 text-slate-400 border-b border-slate-800 uppercase">
                    <tr>
                      <th class="p-4">Skill Name</th>
                      <th class="p-4">Category</th>
                      <th class="p-4">Proficiency</th>
                      <th class="p-4">Status</th>
                      <th class="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60">
                    ${skills.map(sk => `
                      <tr class="hover:bg-[#111C35]/50">
                        <td class="p-4 font-bold text-white">${sk.name}</td>
                        <td class="p-4 text-cyan-400">${sk.category}</td>
                        <td class="p-4 text-slate-300">${sk.proficiency || 90}%</td>
                        <td class="p-4">
                          <span class="px-2.5 py-1 rounded text-[10px] font-bold ${sk.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                            ${sk.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td class="p-4 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <button class="edit-skill-btn px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" data-json="${encodeURIComponent(JSON.stringify(sk))}">Edit</button>
                            <button class="delete-skill-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30" data-id="${sk.id}" data-name="${sk.name}">Delete</button>
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

    const modal = document.getElementById('skill-modal');
    const form = document.getElementById('skill-form') as HTMLFormElement;

    document.getElementById('add-skill-btn')!.onclick = () => {
      (document.getElementById('skill-modal-title')!).textContent = 'Add New Skill';
      (document.getElementById('sk-id') as HTMLInputElement).value = '';
      (document.getElementById('sk-name') as HTMLInputElement).value = '';
      (document.getElementById('sk-category') as HTMLSelectElement).value = 'Frontend';
      (document.getElementById('sk-proficiency') as HTMLInputElement).value = '90';
      (document.getElementById('sk-order') as HTMLInputElement).value = String(skills.length + 1);
      (document.getElementById('sk-published') as HTMLInputElement).checked = true;
      modal?.classList.remove('hidden');
    };

    document.getElementById('close-skill-modal')!.onclick = () => modal?.classList.add('hidden');
    document.getElementById('cancel-skill-modal')!.onclick = () => modal?.classList.add('hidden');

    document.querySelectorAll('.edit-skill-btn').forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        const item: SkillItem = JSON.parse(decodeURIComponent(btn.getAttribute('data-json')!));
        (document.getElementById('skill-modal-title')!).textContent = 'Edit Skill';
        (document.getElementById('sk-id') as HTMLInputElement).value = item.id;
        (document.getElementById('sk-name') as HTMLInputElement).value = item.name;
        (document.getElementById('sk-category') as HTMLSelectElement).value = item.category || 'Frontend';
        (document.getElementById('sk-proficiency') as HTMLInputElement).value = String(item.proficiency || 90);
        (document.getElementById('sk-order') as HTMLInputElement).value = String(item.displayOrder);
        (document.getElementById('sk-published') as HTMLInputElement).checked = item.published;
        modal?.classList.remove('hidden');
      };
    });

    document.querySelectorAll('.delete-skill-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const name = btn.getAttribute('data-name')!;
        if (confirm(`Delete skill "${name}"?`)) {
          await api.deleteSkill(id);
          renderAdminSkillsPage(container);
        }
      };
    });

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const id = (document.getElementById('sk-id') as HTMLInputElement).value;
        const payload = {
          name: (document.getElementById('sk-name') as HTMLInputElement).value.trim(),
          category: (document.getElementById('sk-category') as HTMLSelectElement).value,
          proficiency: parseInt((document.getElementById('sk-proficiency') as HTMLInputElement).value) || 90,
          displayOrder: parseInt((document.getElementById('sk-order') as HTMLInputElement).value) || 0,
          published: (document.getElementById('sk-published') as HTMLInputElement).checked
        };

        if (id) {
          await api.updateSkill(id, payload);
        } else {
          await api.createSkill(payload);
        }
        modal?.classList.add('hidden');
        renderAdminSkillsPage(container);
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

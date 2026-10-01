import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';

export async function renderAdminAboutPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const about = await api.getAbout();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/about')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('About Section Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A] space-y-2">
              <h2 class="text-xl font-bold text-white font-mono">Edit About Section Content</h2>
              <p class="text-xs text-slate-400">Update professional bio, experience years, and profile metrics.</p>
            </div>

            <div id="about-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

            <!-- Form -->
            <div class="bg-[#0A1223] rounded-2xl p-8 border border-[#1A233A]">
              <form id="about-form" class="space-y-6">
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Section Headline Title *</label>
                  <input type="text" id="a-title" required value="${about.title}" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Short Intro Description *</label>
                  <textarea id="a-description" required rows="3" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none">${about.description}</textarea>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Full Biography & Education Focus *</label>
                  <textarea id="a-bio" required rows="5" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-y">${about.bio}</textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Years of Experience</label>
                    <input type="number" id="a-exp" value="${about.yearsExperience}" min="0" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Completed Projects</label>
                    <input type="number" id="a-projects" value="${about.completedProjects}" min="0" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Clients Served</label>
                    <input type="number" id="a-clients" value="${about.clientsServed}" min="0" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">About Profile Image URL</label>
                  <input type="text" id="a-image" value="${about.image}" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <div class="pt-4 flex justify-end">
                  <button type="submit" class="px-8 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan">
                    Save About Section
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const form = document.getElementById('about-form') as HTMLFormElement;
    const alertBox = document.getElementById('about-alert');

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = {
          title: (document.getElementById('a-title') as HTMLInputElement).value.trim(),
          description: (document.getElementById('a-description') as HTMLTextAreaElement).value.trim(),
          bio: (document.getElementById('a-bio') as HTMLTextAreaElement).value.trim(),
          yearsExperience: parseInt((document.getElementById('a-exp') as HTMLInputElement).value) || 0,
          completedProjects: parseInt((document.getElementById('a-projects') as HTMLInputElement).value) || 0,
          clientsServed: parseInt((document.getElementById('a-clients') as HTMLInputElement).value) || 0,
          image: (document.getElementById('a-image') as HTMLInputElement).value.trim()
        };

        try {
          await api.updateAbout(payload);
          if (alertBox) {
            alertBox.classList.remove('hidden', 'bg-rose-500/20', 'text-rose-400');
            alertBox.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/40');
            alertBox.textContent = 'About section updated successfully!';
            setTimeout(() => alertBox.classList.add('hidden'), 3000);
          }
        } catch (err: any) {
          window.alert('Failed to save about content: ' + err.message);
        }
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

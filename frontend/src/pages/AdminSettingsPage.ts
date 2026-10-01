import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';

export async function renderAdminSettingsPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const { settings } = await api.getSettings();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/settings')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Site Configuration & Meta Settings', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A] space-y-2">
              <h2 class="text-xl font-bold text-white font-mono">Global Portfolio Settings</h2>
              <p class="text-xs text-slate-400">Update meta SEO tags, CV download link, contact details, and footer text.</p>
            </div>

            <div id="settings-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

            <!-- Form -->
            <div class="bg-[#0A1223] rounded-2xl p-8 border border-[#1A233A]">
              <form id="settings-form" class="space-y-6">
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Website Title Tag *</label>
                  <input type="text" id="st-title" required value="${settings.siteTitle}" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Meta Description (SEO) *</label>
                  <textarea id="st-meta" required rows="3" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none">${settings.metaDescription}</textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Contact Email Address *</label>
                    <input type="email" id="st-email" required value="${settings.contactEmail}" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Contact Phone Number</label>
                    <input type="text" id="st-phone" value="${settings.contactPhone || ''}" placeholder="+880 1700 000000" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Location / Address</label>
                  <input type="text" id="st-location" value="${settings.contactLocation || ''}" placeholder="Dhaka, Bangladesh" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <!-- CV Upload & Path -->
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">CV File Download URL *</label>
                  <div class="flex gap-3">
                    <input type="text" id="st-cv" required value="${settings.cvUrl}" class="flex-1 px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    <label class="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-400 text-xs font-mono font-semibold cursor-pointer flex items-center justify-center">
                      <span>Upload CV PDF</span>
                      <input type="file" id="st-cv-upload" class="hidden" accept=".pdf,.doc,.docx"/>
                    </label>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Footer Copyright Text *</label>
                  <input type="text" id="st-footer" required value="${settings.footerText}" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <div class="pt-4 flex justify-end">
                  <button type="submit" class="px-8 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan">
                    Save Global Settings
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const cvUploadInput = document.getElementById('st-cv-upload') as HTMLInputElement;
    const cvInput = document.getElementById('st-cv') as HTMLInputElement;

    if (cvUploadInput) {
      cvUploadInput.onchange = async () => {
        if (cvUploadInput.files && cvUploadInput.files[0]) {
          try {
            const res = await api.uploadFile(cvUploadInput.files[0]);
            cvInput.value = res.url;
          } catch (err: any) {
            window.alert('CV upload failed: ' + err.message);
          }
        }
      };
    }

    const form = document.getElementById('settings-form') as HTMLFormElement;
    const alertBox = document.getElementById('settings-alert');

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = {
          siteTitle: (document.getElementById('st-title') as HTMLInputElement).value.trim(),
          metaDescription: (document.getElementById('st-meta') as HTMLTextAreaElement).value.trim(),
          contactEmail: (document.getElementById('st-email') as HTMLInputElement).value.trim(),
          contactPhone: (document.getElementById('st-phone') as HTMLInputElement).value.trim(),
          contactLocation: (document.getElementById('st-location') as HTMLInputElement).value.trim(),
          cvUrl: cvInput.value.trim(),
          footerText: (document.getElementById('st-footer') as HTMLInputElement).value.trim()
        };

        try {
          await api.updateSettings(payload);
          if (alertBox) {
            alertBox.classList.remove('hidden', 'bg-rose-500/20', 'text-rose-400');
            alertBox.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/40');
            alertBox.textContent = 'Site settings updated successfully!';
            setTimeout(() => alertBox.classList.add('hidden'), 3000);
          }
        } catch (err: any) {
          window.alert('Failed to save settings: ' + err.message);
        }
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

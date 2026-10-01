import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';

export async function renderAdminHeroPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const hero = await api.getHero();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/hero')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Hero Section Management', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A] space-y-2">
              <h2 class="text-xl font-bold text-white font-mono">Edit Hero Section Content</h2>
              <p class="text-xs text-slate-400">Update main intro greeting, name, professional title, buttons, and hero profile picture.</p>
            </div>

            <div id="hero-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

            <!-- Form -->
            <div class="bg-[#0A1223] rounded-2xl p-8 border border-[#1A233A]">
              <form id="hero-form" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Greeting *</label>
                    <input type="text" id="h-greeting" required value="${hero.greeting}" placeholder="Hello, I'm" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                  <div class="space-y-2 sm:col-span-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Full Name *</label>
                    <input type="text" id="h-name" required value="${hero.name}" placeholder="Md Iftakhar Ahmed Rifat" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Primary Professional Identity *</label>
                  <input type="text" id="h-title" required value="${hero.title}" placeholder="Web Developer" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Supporting Subtitle Text *</label>
                  <textarea id="h-subtitle" required rows="3" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500 resize-none">${hero.subtitle}</textarea>
                </div>

                <!-- Image Upload & Path -->
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Profile Image Path / URL *</label>
                  <div class="flex gap-3">
                    <input type="text" id="h-profile-img" required value="${hero.profileImage}" class="flex-1 px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm font-mono focus:border-cyan-500"/>
                    <label class="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-400 text-xs font-mono font-semibold cursor-pointer flex items-center justify-center">
                      <span>Upload New Photo</span>
                      <input type="file" id="h-upload-input" class="hidden" accept="image/*"/>
                    </label>
                  </div>
                </div>

                <!-- CTAs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Primary CTA Text & Link</label>
                    <input type="text" id="h-cta1-text" value="${hero.primaryCtaText}" placeholder="View My Work" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono mb-2"/>
                    <input type="text" id="h-cta1-link" value="${hero.primaryCtaLink}" placeholder="#projects" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Secondary CTA Text & Link</label>
                    <input type="text" id="h-cta2-text" value="${hero.secondaryCtaText}" placeholder="Download CV" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono mb-2"/>
                    <input type="text" id="h-cta2-link" value="${hero.secondaryCtaLink}" placeholder="/cv/rifat-cv.pdf" class="w-full px-4 py-2 rounded-xl bg-[#111C35] border border-slate-700 text-white text-xs font-mono"/>
                  </div>
                </div>

                <div class="pt-4 flex justify-end">
                  <button type="submit" class="px-8 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan">
                    Save Hero Section
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const uploadInput = document.getElementById('h-upload-input') as HTMLInputElement;
    const profileImgInput = document.getElementById('h-profile-img') as HTMLInputElement;

    if (uploadInput) {
      uploadInput.onchange = async () => {
        if (uploadInput.files && uploadInput.files[0]) {
          try {
            const res = await api.uploadFile(uploadInput.files[0]);
            profileImgInput.value = res.url;
          } catch (err: any) {
            window.alert('Image upload failed: ' + err.message);
          }
        }
      };
    }

    const form = document.getElementById('hero-form') as HTMLFormElement;
    const alertBox = document.getElementById('hero-alert');

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const payload = {
          greeting: (document.getElementById('h-greeting') as HTMLInputElement).value.trim(),
          name: (document.getElementById('h-name') as HTMLInputElement).value.trim(),
          title: (document.getElementById('h-title') as HTMLInputElement).value.trim(),
          subtitle: (document.getElementById('h-subtitle') as HTMLTextAreaElement).value.trim(),
          profileImage: profileImgInput.value.trim(),
          primaryCtaText: (document.getElementById('h-cta1-text') as HTMLInputElement).value.trim(),
          primaryCtaLink: (document.getElementById('h-cta1-link') as HTMLInputElement).value.trim(),
          secondaryCtaText: (document.getElementById('h-cta2-text') as HTMLInputElement).value.trim(),
          secondaryCtaLink: (document.getElementById('h-cta2-link') as HTMLInputElement).value.trim()
        };

        try {
          await api.updateHero(payload);
          if (alertBox) {
            alertBox.classList.remove('hidden', 'bg-rose-500/20', 'text-rose-400');
            alertBox.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/40');
            alertBox.textContent = 'Hero section updated successfully!';
            setTimeout(() => alertBox.classList.add('hidden'), 3000);
          }
        } catch (err: any) {
          window.alert('Failed to save hero content: ' + err.message);
        }
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

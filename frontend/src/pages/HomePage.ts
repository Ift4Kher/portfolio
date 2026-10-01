import { api } from '../services/api';
import { renderNavbar, initNavbarEvents } from '../components/Navbar';
import { renderHero } from '../components/Hero';
import { renderAbout } from '../components/About';
import { renderServices } from '../components/Services';
import { renderSkills } from '../components/Skills';
import { renderCarousel3D, initCarousel3DEvents } from '../components/Carousel3D';
import { renderProcess } from '../components/Process';
import { renderEducation } from '../components/Education';
import { renderContact, initContactFormEvents } from '../components/Contact';
import { renderFooter } from '../components/Footer';

export async function renderHomePage(container: HTMLElement) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center py-20 font-mono text-cyan-400">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span>Loading Portfolio...</span>
      </div>
    </div>
  `;

  try {
    const [hero, about, services, skills, featuredProjects, education, processSteps, settingsRes] = await Promise.all([
      api.getHero(),
      api.getAbout(),
      api.getServices(),
      api.getSkills(),
      api.getFeaturedProjects(),
      api.getEducation(),
      api.getProcessSteps(),
      api.getSettings()
    ]);

    const { settings, socials } = settingsRes;

    container.innerHTML = `
      ${renderNavbar('/')}
      <main>
        ${renderHero(hero)}
        ${renderAbout(about)}
        ${renderServices()}
        ${renderSkills(skills)}
        ${renderCarousel3D(featuredProjects)}
        ${renderProcess()}
        ${renderEducation()}
        ${renderContact(settings, socials)}
      </main>
      ${renderFooter(settings, socials)}
    `;

    // Initialize interactive handlers
    initNavbarEvents();
    initCarousel3DEvents();
    initContactFormEvents();
    window.scrollTo(0, 0);
  } catch (error: any) {
    container.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 class="text-2xl font-bold text-rose-400 font-mono">Unable to connect to Portfolio API</h2>
        <p class="text-sm text-slate-400 max-w-md">${error.message || 'Please check backend connection.'}</p>
        <button onclick="window.location.reload()" class="px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-mono text-xs font-semibold">
          Retry Loading
        </button>
      </div>
    `;
  }
}

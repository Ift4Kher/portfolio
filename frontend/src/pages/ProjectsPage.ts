import { api } from '../services/api';
import { renderNavbar, initNavbarEvents } from '../components/Navbar';
import { renderFooter } from '../components/Footer';
import { ProjectItem } from '../types';

let currentCategory = 'All';
let currentSearch = '';

const categoryIcons: Record<string, string> = {
  'Full Stack': `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
  'Frontend': `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  'Backend': `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
  'UI/UX': `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`,
  'Management System': `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>`
};

export async function renderProjectsPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center py-20 bg-[#030711] text-[#00D9FF]">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span class="font-mono text-sm tracking-widest uppercase">Loading Projects...</span>
      </div>
    </div>
  `;

  try {
    const [projects, settingsRes] = await Promise.all([
      api.getProjects(currentCategory, currentSearch),
      api.getSettings()
    ]);

    const { settings, socials } = settingsRes;
    const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'UI/UX', 'Management System'];

    container.innerHTML = `
      ${renderNavbar('/projects')}
      <main class="pt-32 pb-24 px-4 sm:px-8 min-h-screen relative bg-[#030711] overflow-hidden">
        <!-- Ambient Glowing Orbs -->
        <div class="absolute top-[10%] -left-[300px] w-[600px] h-[600px] bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute top-[40%] -right-[300px] w-[600px] h-[600px] bg-gradient-to-bl from-[#00D9FF]/10 via-[#A855F7]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-[1300px] mx-auto space-y-12 relative z-10">
          
          <!-- Page Header -->
          <div class="flex flex-col items-center text-center">
            <div class="flex items-center gap-4 mb-4">
              <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00D9FF]"></div>
              <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.2em] uppercase">My Portfolio</span>
              <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#00D9FF]"></div>
            </div>
            
            <h1 class="text-5xl sm:text-[56px] font-black text-white tracking-tighter mb-6">
              Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">Projects</span>
            </h1>
            
            <p class="text-[#7C8B9E] max-w-2xl text-[14.5px] leading-[1.7]">
              Explore my complete catalog of full-stack web applications, e-commerce platforms, SaaS dashboards, and custom management tools engineered by me.
            </p>
          </div>

          <!-- Controls Bar (Search & Category Filters) -->
          <div class="flex flex-col xl:flex-row items-center justify-between gap-6 bg-[#0A1223] border border-[#1A233A] rounded-[24px] p-2.5 shadow-2xl">
            <!-- Category Pills -->
            <div class="flex flex-wrap items-center justify-center xl:justify-start gap-1 w-full xl:w-auto overflow-x-auto no-scrollbar">
              ${categories.map(cat => `
                <button 
                  class="cat-filter-btn flex items-center gap-2 rounded-[20px] transition-all whitespace-nowrap ${cat === currentCategory ? 'bg-[#00D9FF] text-[#030711] font-bold px-6 py-2.5 text-[13px] shadow-[0_0_15px_rgba(0,217,255,0.4)]' : 'bg-transparent text-[#7C8B9E] hover:text-white hover:bg-white/5 font-medium px-4 py-2.5 text-[13px]'}"
                  data-cat="${cat}"
                >
                  ${cat !== 'All' && categoryIcons[cat] ? categoryIcons[cat] : ''}
                  ${cat}
                </button>
              `).join('')}
            </div>

            <!-- Search Input -->
            <div class="relative w-full xl:w-[320px] shrink-0">
              <input 
                type="text" 
                id="project-search-input" 
                value="${currentSearch}" 
                placeholder="Search projects or technologies..." 
                class="w-full pl-11 pr-5 py-3 rounded-[18px] bg-[#030711] border border-[#1A233A] text-white placeholder-[#7C8B9E] text-[13px] focus:outline-none focus:border-[#00D9FF]/50 focus:ring-1 focus:ring-[#00D9FF]/50 transition-all shadow-inner"
              />
              <svg class="w-4 h-4 text-[#7C8B9E] absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <!-- Projects Cards Grid -->
          ${projects.length === 0 ? `
            <div class="bg-[#0A1223] border border-[#1A233A] rounded-[24px] px-12 py-20 text-center flex flex-col items-center justify-center space-y-4">
              <div class="w-16 h-16 rounded-full bg-[#1A233A] flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#7C8B9E]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h3 class="text-xl font-bold text-white">No Projects Found</h3>
              <p class="text-[14px] text-[#7C8B9E]">We couldn't find any projects matching your current filters.</p>
              <button id="reset-filters-btn" class="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00D9FF]/10 to-[#A855F7]/10 text-white border border-white/10 text-[13px] font-bold hover:border-[#00D9FF]/40 transition-all">
                Reset Filters
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${projects.map(p => {
                const categoryColorClass = 'text-[#00D9FF] border-[#00D9FF]/50'; // Default category color
                return `
                <div class="bg-[#0A1223] border border-[#1A233A] rounded-[24px] overflow-hidden flex flex-col group hover:border-[#00D9FF]/30 hover:shadow-[0_10px_40px_-10px_rgba(0,217,255,0.1)] transition-all duration-300 relative">
                  
                  <!-- Inset Image Box -->
                  <div class="p-3 pb-0">
                    <div class="relative w-full h-[220px] rounded-[18px] bg-[#030711] overflow-hidden flex items-center justify-center">
                      <img 
                        src="${p.coverImage}" 
                        alt="${p.title}" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-[#0A1223] via-transparent to-transparent opacity-80"></div>
                      
                      <!-- Category Badge -->
                      <div class="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#030711]/80 backdrop-blur-md border border-[#00D9FF]/50 text-[#00D9FF] text-[10px] font-bold tracking-wide">
                        ${p.categoriesList && p.categoriesList[0] ? p.categoriesList[0] : 'Full Stack'}
                      </div>

                      <!-- Featured Badge -->
                      ${p.featured ? `
                        <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#030711]/80 backdrop-blur-md border border-[#EAB308]/40 text-[#EAB308] text-[10px] font-bold tracking-wide flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          <span>Featured</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Content Area -->
                  <div class="p-6 flex flex-col flex-1">
                    <h2 class="text-[17px] font-bold text-white mb-2.5 line-clamp-1 group-hover:text-[#00D9FF] transition-colors">
                      ${p.title}
                    </h2>
                    <p class="text-[#7C8B9E] text-[13px] leading-[1.6] line-clamp-2 mb-5 font-light">
                      ${p.shortDescription}
                    </p>

                    <!-- Tech Pills -->
                    <div class="flex flex-wrap gap-2 mb-6">
                      ${(p.technologiesList || []).slice(0,4).map(t => `
                        <span class="px-3 py-1 rounded-full bg-[#1A233A]/50 border border-[#1A233A] text-[10px] font-semibold text-[#7C8B9E]">
                          ${t}
                        </span>
                      `).join('')}
                      ${(p.technologiesList && p.technologiesList.length > 4) ? `<span class="px-2 py-1 rounded-full bg-[#1A233A]/50 border border-[#1A233A] text-[10px] font-semibold text-[#7C8B9E]">+${p.technologiesList.length - 4}</span>` : ''}
                    </div>

                    <!-- Card Footer -->
                    <div class="mt-auto pt-4 border-t border-[#1A233A] flex items-center justify-between">
                      <a href="#/projects/${p.slug}" class="text-[12.5px] font-bold text-white group-hover:text-[#00D9FF] transition-colors flex items-center gap-1.5">
                        View Details
                        <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </a>
                      
                      <div class="flex items-center gap-4">
                        ${p.githubUrl ? `
                          <a href="${p.githubUrl}" target="_blank" class="text-[#7C8B9E] hover:text-white transition-colors" title="View Source">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                          </a>
                        ` : ''}
                        ${p.liveDemoUrl ? `
                          <a href="${p.liveDemoUrl}" target="_blank" class="text-[#7C8B9E] hover:text-[#00D9FF] transition-colors" title="Live Preview">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                          </a>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </main>
      ${renderFooter(settings, socials)}
    `;

    initNavbarEvents();

    // Category filter click handler
    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
      (btn as HTMLElement).onclick = () => {
        currentCategory = btn.getAttribute('data-cat') || 'All';
        renderProjectsPage(container);
      };
    });

    // Search input handler with debounce
    const searchInput = document.getElementById('project-search-input') as HTMLInputElement;
    if (searchInput) {
      let timeout: any;
      searchInput.oninput = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          currentSearch = searchInput.value.trim();
          renderProjectsPage(container);
        }, 400);
      };
    }

    // Reset button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        currentCategory = 'All';
        currentSearch = '';
        renderProjectsPage(container);
      };
    }

    window.scrollTo(0, 0);
  } catch (error: any) {
    container.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-4 bg-[#030711]">
        <h2 class="text-2xl font-bold text-rose-500 font-mono">Error Loading Projects</h2>
        <p class="text-sm text-[#7C8B9E] max-w-md">${error.message}</p>
      </div>
    `;
  }
}

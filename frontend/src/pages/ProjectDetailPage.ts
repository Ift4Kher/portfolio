import { api } from '../services/api';
import { renderNavbar, initNavbarEvents } from '../components/Navbar';
import { renderFooter } from '../components/Footer';

export async function renderProjectDetailPage(container: HTMLElement, slug: string) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center py-20 bg-[#030711] text-[#00D9FF]">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span class="font-mono text-[11px] tracking-[0.2em] uppercase">Loading Case Study...</span>
      </div>
    </div>
  `;

  try {
    const [project, allProjects, settingsRes] = await Promise.all([
      api.getProjectBySlug(slug),
      api.getProjects(),
      api.getSettings()
    ]);

    const { settings, socials } = settingsRes;

    // Parse keyFeatures JSON array if applicable
    let keyFeaturesList: string[] = [];
    if (project.keyFeatures) {
      try {
        if (project.keyFeatures.startsWith('[')) {
          keyFeaturesList = JSON.parse(project.keyFeatures);
        } else {
          keyFeaturesList = project.keyFeatures.split('\\n').filter(Boolean);
        }
      } catch {
        keyFeaturesList = [project.keyFeatures];
      }
    }

    // Related projects (excluding current)
    const relatedProjects = allProjects.filter(p => p.slug !== slug).slice(0, 3);

    container.innerHTML = `
      ${renderNavbar('/projects')}
      <main class="pt-32 pb-24 px-4 sm:px-8 min-h-screen relative bg-[#030711] overflow-hidden">
        
        <!-- Ambient Glowing Orbs -->
        <div class="absolute top-[10%] -left-[200px] w-[500px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div class="absolute top-[30%] -right-[200px] w-[500px] h-[500px] bg-gradient-to-bl from-[#00D9FF]/10 via-[#A855F7]/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-[1100px] mx-auto space-y-16 relative z-10">
          
          <!-- Header Area -->
          <div class="space-y-8">
            
            <!-- Back Link & Metadata -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a href="#/projects" class="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-[#7C8B9E] hover:text-[#00D9FF] uppercase transition-colors group">
                <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>Back to Projects</span>
              </a>

              <div class="flex items-center gap-3">
                <span class="px-3.5 py-1.5 rounded-full bg-[#00D9FF]/5 border border-[#00D9FF]/20 text-[10px] font-bold tracking-[0.15em] text-[#00D9FF] uppercase">
                  ${project.categoriesList && project.categoriesList[0] ? project.categoriesList[0] : 'Full Stack'}
                </span>
                ${project.featured ? `
                  <span class="px-3.5 py-1.5 rounded-full bg-[#EAB308]/5 border border-[#EAB308]/20 text-[10px] font-bold tracking-[0.15em] text-[#EAB308] uppercase flex items-center gap-1.5">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Featured
                  </span>
                ` : ''}
                <span class="text-[11px] font-medium text-[#7C8B9E] tracking-wider uppercase ml-1">
                  ${new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>

            <!-- Title & Short Description -->
            <div class="space-y-6">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                ${project.title}
              </h1>
              <p class="text-[#94A3B8] text-[16px] sm:text-[18px] leading-[1.7] max-w-3xl font-medium">
                ${project.shortDescription}
              </p>
            </div>

            <!-- Action Bar -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t border-white/5">
              
              <!-- Technologies -->
              <div class="flex flex-wrap gap-2">
                ${(project.technologiesList || []).map(t => `
                  <span class="px-3.5 py-1.5 rounded-full bg-[#0A1223] border border-[#1A233A] text-[11px] font-semibold tracking-wide text-[#7C8B9E]">
                    ${t}
                  </span>
                `).join('')}
              </div>

              <!-- Buttons -->
              <div class="flex items-center gap-4 shrink-0">
                ${project.githubUrl ? `
                  <a href="${project.githubUrl}" target="_blank" class="px-6 py-3 rounded-full bg-[#0A1223] border border-[#1A233A] hover:border-[#00D9FF]/30 text-white text-[13px] font-bold transition-all flex items-center gap-2 hover:bg-[#0C162C]">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    <span>Source Code</span>
                  </a>
                ` : ''}

                ${project.liveDemoUrl ? `
                  <a href="${project.liveDemoUrl}" target="_blank" class="px-7 py-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-white text-[13px] font-bold hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2 group">
                    <span>Live Project</span>
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- Cover Image -->
            <div class="rounded-[24px] overflow-hidden border border-white/5 bg-[#0A1223] shadow-2xl relative group">
              <img 
                src="${project.coverImage}" 
                alt="${project.title}" 
                class="w-full aspect-[16/10] max-h-[600px] object-cover filter brightness-105" width="800" height="500"
                onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#030711]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>

          <!-- Main Case Study Sections Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <!-- Left Column: Overview & Features -->
            <div class="lg:col-span-8 space-y-12">
              
              <!-- Overview -->
              <div class="space-y-5">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-[#00D9FF]"></div>
                  <h2 class="text-2xl font-bold text-white tracking-tight">Project Overview</h2>
                </div>
                <div class="text-[#7C8B9E] text-[15px] leading-[1.8] space-y-4">
                  <p>${project.fullDescription}</p>
                  ${project.overview ? `<p>${project.overview}</p>` : ''}
                </div>
              </div>

              <!-- Key Features -->
              ${keyFeaturesList.length > 0 ? `
                <div class="space-y-5 pt-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-[#A855F7]"></div>
                    <h2 class="text-2xl font-bold text-white tracking-tight">Key Features</h2>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${keyFeaturesList.map(feat => `
                      <div class="p-5 rounded-[16px] bg-[#0A1223] border border-[#1A233A] flex items-start gap-4 hover:border-[#A855F7]/30 transition-colors">
                        <div class="w-6 h-6 rounded-full bg-[#A855F7]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg class="w-3.5 h-3.5 text-[#A855F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <span class="text-[14px] text-[#94A3B8] font-medium leading-relaxed">${feat}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Gallery Images Grid -->
              ${(project.gallery && project.gallery.length > 0) ? `
                <div class="space-y-5 pt-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                    <h2 class="text-2xl font-bold text-white tracking-tight">Gallery</h2>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${project.gallery.map(img => `
                      <div class="rounded-[16px] overflow-hidden border border-[#1A233A] bg-[#0A1223] group">
                        <div class="relative overflow-hidden">
                          <img 
                            src="${img.imageUrl}" 
                            alt="${img.caption || project.title}" 
                            class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" 
                            onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"
                          />
                        </div>
                        ${img.caption ? `
                          <div class="p-4 bg-[#0A1223] border-t border-[#1A233A]">
                            <p class="text-[12px] font-medium text-[#7C8B9E]">${img.caption}</p>
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

            </div>

            <!-- Right Column: Problem, Solution, Challenges -->
            <div class="lg:col-span-4 space-y-6">
              
              ${project.problem ? `
                <div class="bg-[#0A1223] border border-[#1A233A] rounded-[20px] p-7 hover:border-white/10 transition-colors">
                  <div class="w-10 h-10 rounded-[12px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5">
                    <svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </div>
                  <h3 class="text-[18px] font-bold text-white mb-3 tracking-tight">The Problem</h3>
                  <p class="text-[#7C8B9E] text-[13.5px] leading-[1.7]">${project.problem}</p>
                </div>
              ` : ''}

              ${project.solution ? `
                <div class="bg-[#0A1223] border border-[#1A233A] rounded-[20px] p-7 hover:border-[#00D9FF]/20 transition-colors relative overflow-hidden group">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-[#00D9FF]/5 rounded-bl-[100px] -z-10 group-hover:bg-[#00D9FF]/10 transition-colors"></div>
                  <div class="w-10 h-10 rounded-[12px] bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center mb-5">
                    <svg class="w-5 h-5 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <h3 class="text-[18px] font-bold text-white mb-3 tracking-tight">The Solution</h3>
                  <p class="text-[#7C8B9E] text-[13.5px] leading-[1.7]">${project.solution}</p>
                </div>
              ` : ''}

              ${project.challenges ? `
                <div class="bg-[#0A1223] border border-[#1A233A] rounded-[20px] p-7 hover:border-amber-500/20 transition-colors">
                  <div class="w-10 h-10 rounded-[12px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
                    <svg class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <h3 class="text-[18px] font-bold text-white mb-3 tracking-tight">Technical Challenges</h3>
                  <p class="text-[#7C8B9E] text-[13.5px] leading-[1.7]">${project.challenges}</p>
                </div>
              ` : ''}

              ${project.results ? `
                <div class="bg-[#0A1223] border border-[#1A233A] rounded-[20px] p-7 hover:border-[#10B981]/20 transition-colors">
                  <div class="w-10 h-10 rounded-[12px] bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-5">
                    <svg class="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </div>
                  <h3 class="text-[18px] font-bold text-white mb-3 tracking-tight">Results & Impact</h3>
                  <p class="text-[#7C8B9E] text-[13.5px] leading-[1.7]">${project.results}</p>
                </div>
              ` : ''}

            </div>
          </div>

          <!-- Related Projects -->
          ${relatedProjects.length > 0 ? `
            <div class="pt-16 mt-16 border-t border-white/5 space-y-8">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-white tracking-tight">More Projects</h3>
                <a href="#/projects" class="text-[13px] font-bold text-[#00D9FF] hover:text-white transition-colors flex items-center gap-1.5">
                  View All <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${relatedProjects.map(rel => `
                  <a href="#/projects/${rel.slug}" class="bg-[#0A1223] border border-[#1A233A] rounded-[20px] p-4 space-y-4 block group hover:border-[#00D9FF]/30 hover:shadow-[0_10px_30px_-10px_rgba(0,217,255,0.1)] transition-all duration-300">
                    <div class="h-40 rounded-[12px] overflow-hidden bg-[#030711] relative">
                      <img src="${rel.coverImage}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"/>
                      <div class="absolute inset-0 bg-[#0A1223]/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div>
                      <h4 class="font-bold text-white text-[15px] line-clamp-1 group-hover:text-[#00D9FF] transition-colors mb-1.5">${rel.title}</h4>
                      <p class="text-[13px] text-[#7C8B9E] line-clamp-2 leading-relaxed">${rel.shortDescription}</p>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </main>
      ${renderFooter(settings, socials)}
    `;

    initNavbarEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error: any) {
    container.innerHTML = `
      ${renderNavbar('/projects')}
      <div class="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-5 bg-[#030711]">
        <div class="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <h2 class="text-[28px] font-black text-white tracking-tight">Project Not Found</h2>
        <p class="text-[15px] text-[#7C8B9E] max-w-md">${error.message}</p>
        <a href="#/projects" class="mt-4 px-7 py-3 rounded-full bg-[#0A1223] border border-[#1A233A] text-white hover:border-[#00D9FF]/40 text-[13px] font-bold transition-all">
          Return to Portfolio
        </a>
      </div>
      ${renderFooter({} as any, [])}
    `;
    initNavbarEvents();
  }
}

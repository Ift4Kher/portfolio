import { ProjectItem } from '../types';

let currentIndex = 0;
let projectsList: ProjectItem[] = [];
let autoPlayInterval: number | null = null;

export function renderCarousel3D(projects: ProjectItem[]): string {
  projectsList = projects;
  if (projectsList.length === 0) {
    return `
      <section id="featured-projects" class="py-24 px-4 sm:px-8 bg-[#030711] relative border-t border-[#1A233A] text-center">
        <p class="text-[#7C8B9E] font-mono text-[13px]">No featured projects found.</p>
      </section>
    `;
  }

  return `
    <section id="featured-projects" class="py-24 px-4 sm:px-8 bg-[#030711] relative border-t border-[#1A233A] overflow-hidden">
      <!-- Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00D9FF]/5 to-[#A855F7]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div class="max-w-[1300px] mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div class="flex flex-col items-start space-y-3">
            <div class="flex items-center gap-3">
              <div class="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#00D9FF]"></div>
              <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.2em] uppercase">Featured Projects</span>
            </div>
            <h2 class="text-4xl sm:text-[44px] font-black text-white tracking-tighter">
              Selected Work
            </h2>
          </div>
          <a href="#/projects" class="px-6 py-3 rounded-full flex items-center gap-2 text-[13px] font-bold text-white bg-gradient-to-r from-[#00D9FF]/10 to-[#A855F7]/10 border border-white/10 hover:border-[#00D9FF]/40 transition-all group">
            View All Projects
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>

        <!-- 3D Carousel Stage Container -->
        <div id="carousel-3d-stage" class="carousel-3d-stage my-8">
          <div id="carousel-3d-container" class="carousel-3d-container">
            ${projectsList.map((p, idx) => `
              <div 
                class="carousel-3d-card bg-[#0A1223] rounded-[24px] border border-[#1A233A] overflow-hidden cursor-pointer group"
                data-index="${idx}"
                id="carousel-card-${idx}"
              >
                <!-- Card Header Image -->
                <div class="p-3 pb-0">
                  <div class="relative w-full h-[220px] rounded-[18px] overflow-hidden bg-[#030711]">
                    <img 
                      src="${p.coverImage}" 
                      alt="${p.title}" 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      onerror="this.onerror=null; this.src='/images/projects/portfolio-cms.svg'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0A1223] via-transparent to-transparent opacity-80"></div>
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#030711]/80 backdrop-blur-md border border-[#00D9FF]/50 text-[10px] font-bold text-[#00D9FF] tracking-wide">
                      ${p.categoriesList && p.categoriesList[0] ? p.categoriesList[0] : 'Full Stack'}
                    </div>

                    <!-- Order Pill -->
                    <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#030711]/80 backdrop-blur-md border border-[#A855F7]/40 text-[#A855F7] text-[11px] flex items-center justify-center font-bold">
                      ${idx + 1}
                    </div>
                  </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 flex flex-col justify-between h-[218px]">
                  <div class="space-y-2.5">
                    <h3 class="text-[17px] font-bold text-white line-clamp-1 group-hover:text-[#00D9FF] transition-colors">
                      ${p.title}
                    </h3>
                    <p class="text-[13px] text-[#7C8B9E] line-clamp-2 leading-[1.6] font-light">
                      ${p.shortDescription}
                    </p>
                  </div>

                  <!-- Tech Stack Pills -->
                  <div class="flex flex-wrap gap-2 py-3">
                    ${(p.technologiesList || []).slice(0, 4).map(tech => `
                      <span class="px-3 py-1 rounded-full bg-[#1A233A]/50 border border-[#1A233A] text-[10px] font-semibold text-[#7C8B9E]">
                        ${tech}
                      </span>
                    `).join('')}
                  </div>

                  <!-- Action Link -->
                  <div class="flex items-center justify-between pt-4 border-t border-[#1A233A]">
                    <a href="#/projects/${p.slug}" class="text-[12.5px] font-bold text-white group-hover:text-[#00D9FF] transition-colors flex items-center gap-1.5">
                      <span>Explore Case Study</span>
                      <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </a>
                    ${p.liveDemoUrl ? `
                      <a href="${p.liveDemoUrl}" target="_blank" class="text-[#7C8B9E] hover:text-[#00D9FF] transition-colors" title="Live Demo">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </a>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Carousel Navigation Controls -->
        <div class="flex items-center justify-center gap-6 mt-12">
          <button id="carousel-prev-btn" class="w-12 h-12 rounded-full bg-[#0A1223] border border-[#1A233A] hover:border-[#00D9FF]/40 text-[#7C8B9E] hover:text-[#00D9FF] flex items-center justify-center transition-all shadow-lg transform hover:-translate-x-1" aria-label="Previous Project">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <!-- Position Indicators Dots -->
          <div id="carousel-dots" class="flex items-center gap-2.5">
            ${projectsList.map((_, idx) => `
              <button 
                class="carousel-dot w-2.5 h-2.5 rounded-full transition-all bg-[#1A233A] hover:bg-[#7C8B9E]" 
                data-dot="${idx}"
                aria-label="Go to slide ${idx + 1}"
              ></button>
            `).join('')}
          </div>

          <button id="carousel-next-btn" class="w-12 h-12 rounded-full bg-[#0A1223] border border-[#1A233A] hover:border-[#00D9FF]/40 text-[#7C8B9E] hover:text-[#00D9FF] flex items-center justify-center transition-all shadow-lg transform hover:translate-x-1" aria-label="Next Project">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  `;
}

export function update3DCarousel() {
  const cards = document.querySelectorAll<HTMLElement>('.carousel-3d-card');
  const dots = document.querySelectorAll<HTMLElement>('.carousel-dot');
  const total = projectsList.length;

  if (total === 0) return;

  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

  const offsetX = isMobile ? 180 : isTablet ? 230 : 320;
  const translateZFar = isMobile ? -100 : -200;
  const rotateAngle = isMobile ? 25 : 35;

  cards.forEach((card, idx) => {
    // Calculate relative index from current active card
    let diff = idx - currentIndex;
    
    // Wrap around for smooth infinite carousel feel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      // Active center card
      card.style.transform = `translateX(0px) translateZ(0px) rotateY(0deg) scale(1)`;
      card.style.opacity = '1';
      card.style.zIndex = '30';
      card.style.filter = 'blur(0px)';
      card.style.pointerEvents = 'auto';
    } else if (diff === 1) {
      // Immediate right card
      card.style.transform = `translateX(${offsetX}px) translateZ(${translateZFar}px) rotateY(-${rotateAngle}deg) scale(0.82)`;
      card.style.opacity = isMobile ? '0' : '0.7';
      card.style.zIndex = '20';
      card.style.filter = 'blur(1.5px)';
      card.style.pointerEvents = 'auto';
    } else if (diff === -1) {
      // Immediate left card
      card.style.transform = `translateX(-${offsetX}px) translateZ(${translateZFar}px) rotateY(${rotateAngle}deg) scale(0.82)`;
      card.style.opacity = isMobile ? '0' : '0.7';
      card.style.zIndex = '20';
      card.style.filter = 'blur(1.5px)';
      card.style.pointerEvents = 'auto';
    } else if (diff === 2 || diff === - (total - 2)) {
      // Far right
      card.style.transform = `translateX(${offsetX * 1.6}px) translateZ(${translateZFar * 1.8}px) rotateY(-${rotateAngle * 1.2}deg) scale(0.68)`;
      card.style.opacity = '0';
      card.style.zIndex = '10';
      card.style.filter = 'blur(4px)';
      card.style.pointerEvents = 'none';
    } else if (diff === -2 || diff === (total - 2)) {
      // Far left
      card.style.transform = `translateX(-${offsetX * 1.6}px) translateZ(${translateZFar * 1.8}px) rotateY(${rotateAngle * 1.2}deg) scale(0.68)`;
      card.style.opacity = '0';
      card.style.zIndex = '10';
      card.style.filter = 'blur(4px)';
      card.style.pointerEvents = 'none';
    } else {
      // Completely hidden cards
      card.style.transform = `translateX(0px) translateZ(-500px) scale(0.5)`;
      card.style.opacity = '0';
      card.style.zIndex = '0';
      card.style.filter = 'blur(10px)';
      card.style.pointerEvents = 'none';
    }
  });

  // Update position indicator dots
  dots.forEach((dot, idx) => {
    if (idx === currentIndex) {
      dot.className = 'carousel-dot w-8 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.4)] transition-all duration-300';
    } else {
      dot.className = 'carousel-dot w-2.5 h-2.5 rounded-full bg-[#1A233A] hover:bg-[#7C8B9E] transition-all duration-300';
    }
  });
}

export function initCarousel3DEvents() {
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const stage = document.getElementById('carousel-3d-stage');
  const cards = document.querySelectorAll<HTMLElement>('.carousel-3d-card');
  const dots = document.querySelectorAll<HTMLElement>('.carousel-dot');

  const goToNext = () => {
    if (projectsList.length === 0) return;
    currentIndex = (currentIndex + 1) % projectsList.length;
    update3DCarousel();
  };

  const goToPrev = () => {
    if (projectsList.length === 0) return;
    currentIndex = (currentIndex - 1 + projectsList.length) % projectsList.length;
    update3DCarousel();
  };

  if (prevBtn) prevBtn.onclick = goToPrev;
  if (nextBtn) nextBtn.onclick = goToNext;

  cards.forEach(card => {
    card.onclick = () => {
      const index = parseInt(card.getAttribute('data-index') || '0');
      if (index === currentIndex) {
        // Active card click -> navigate to project details
        const slug = projectsList[index]?.slug;
        if (slug) window.location.hash = `#/projects/${slug}`;
      } else {
        currentIndex = index;
        update3DCarousel();
      }
    };
  });

  dots.forEach(dot => {
    dot.onclick = () => {
      const idx = parseInt(dot.getAttribute('data-dot') || '0');
      currentIndex = idx;
      update3DCarousel();
    };
  });

  // Keyboard navigation
  if ((window as any)._carouselKeydownHandler) {
    window.removeEventListener('keydown', (window as any)._carouselKeydownHandler);
  }
  (window as any)._carouselKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
  };
  window.addEventListener('keydown', (window as any)._carouselKeydownHandler);

  // Touch Swipe Support
  let startX = 0;
  let endX = 0;

  if (stage) {
    stage.ontouchstart = (e) => {
      startX = e.touches[0].clientX;
    };

    stage.ontouchend = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToNext();
        else goToPrev();
      }
    };

    // Auto-play with pause on hover
    stage.onmouseenter = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    };

    stage.onmouseleave = () => {
      startAutoPlay();
    };
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = window.setInterval(() => {
      // Check if carousel still exists in DOM (user didn't navigate away)
      if (!document.getElementById('carousel-3d-stage')) {
        if (autoPlayInterval !== null) clearInterval(autoPlayInterval);
        return;
      }
      goToNext();
    }, 5000);
  }

  startAutoPlay();
  update3DCarousel();
}

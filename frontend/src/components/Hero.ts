import { HeroData } from '../types';

export function renderHero(hero: HeroData): string {
  const profileImgUrl = hero.profileImage || '/images/rifat-hero.png';

  return `
    <section id="hero" class="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-[#030711]">
      
      <!-- Ambient Background Glows -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1687FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7C3CFF]/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <!-- Subtle Grid/Noise Texture -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div class="max-w-[1250px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        <!-- LEFT COLUMN (Intro & Content) -->
        <div class="flex flex-col items-start space-y-6 text-left relative z-20">
          
          <!-- Greeting -->
          <div class="text-white font-medium text-[15px] sm:text-[17px] flex items-center gap-2 tracking-wide opacity-90">
            <span>👋</span> Hello, I'm
          </div>
          
          <!-- Main Name -->
          <h1 class="text-[64px] sm:text-[80px] lg:text-[88px] font-black tracking-[-0.03em] leading-[1.05]">
            <div class="text-white block">Md Iftakhar</div>
            <div class="relative inline-block">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] via-[#1687FF] to-[#A855F7]">Ahmed Rifat</span>
              <!-- Hand-drawn cyan/purple underline -->
              <svg class="absolute -bottom-2 left-0 w-full h-[12px] opacity-80" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M2,8 Q50,0 100,5 T198,8" fill="none" stroke="url(#lineGrad)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00D9FF" />
                    <stop offset="100%" stop-color="#7C3CFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </h1>
          
          <!-- Professional Title -->
          <h2 class="text-3xl sm:text-[40px] font-bold tracking-tight mt-2">
            <span class="text-white">Full-Stack</span> 
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#1687FF]">Web Developer</span>
          </h2>
          
          <!-- Description -->
          <p class="text-[17px] sm:text-[18px] text-[#94A3B8] max-w-[540px] font-medium leading-[1.6] mt-2">
            I build modern, fast and scalable web applications that turn ideas into real digital products.
          </p>
          
          <!-- Technology Pills -->
          <div class="flex flex-wrap items-center gap-3 pt-3">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <span class="w-4 h-4 flex items-center justify-center bg-[#E34F26] text-white rounded-[3px] text-[8px]">5</span> HTML5
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <span class="w-4 h-4 flex items-center justify-center bg-[#1572B6] text-white rounded-[3px] text-[8px]">3</span> CSS3
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <span class="w-4 h-4 flex items-center justify-center bg-[#F7DF1E] text-black rounded-[3px] text-[8px] font-bold">JS</span> JavaScript
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <svg class="w-4 h-4 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)"/></svg> React
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <span class="text-[#339933] text-[14px] leading-none">⬢</span> Node.js
            </div>
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0A1223]/60 backdrop-blur-sm text-[12px] font-semibold text-[#F8FAFC] shadow-[0_0_10px_rgba(0,217,255,0.05)]">
              <span class="text-[#47A248] text-[14px] leading-none">🍃</span> MongoDB
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <!-- Primary Button -->
            <a href="${hero.primaryCtaLink || '#projects'}" class="px-8 py-3.5 rounded-full font-bold text-[14px] text-white bg-gradient-to-r from-[#00D9FF] via-[#1687FF] to-[#A855F7] shadow-[0_0_20px_rgba(22,135,255,0.3)] hover:shadow-[0_0_30px_rgba(22,135,255,0.5)] transition-all flex items-center gap-2 group hover:-translate-y-0.5">
              <span>View My Work</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <!-- Secondary Button -->
            <a href="${hero.secondaryCtaLink || '/cv/rifat-cv.pdf'}" target="_blank" download="Md_Iftakhar_Ahmed_Rifat_CV.pdf" class="px-8 py-3.5 rounded-full font-bold text-[14px] text-white bg-[#0A1223]/50 backdrop-blur-md border border-[#7C3CFF]/40 hover:bg-[#7C3CFF]/10 transition-all flex items-center gap-2 group hover:-translate-y-0.5 shadow-[0_0_15px_rgba(124,60,255,0.1)] hover:shadow-[0_0_20px_rgba(124,60,255,0.2)]">
              <span>Download CV</span>
              <svg class="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </a>
          </div>
          
          <!-- Statistics Row -->
          <div class="flex items-center gap-6 sm:gap-8 pt-8 mt-2">
            <!-- Stat 1 -->
            <div class="flex items-center gap-3 group">
              <svg class="w-7 h-7 text-[#00D9FF] opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              <div class="flex flex-col">
                <span class="text-white font-bold text-[17px] leading-tight">2+</span>
                <span class="text-[#94A3B8] text-[11px] font-medium mt-0.5 tracking-wide">Years Experience</span>
              </div>
            </div>
            
            <div class="w-px h-8 bg-white/10"></div>
            
            <!-- Stat 2 -->
            <div class="flex items-center gap-3 group">
              <svg class="w-7 h-7 text-[#00D9FF] opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="14" height="18" x="5" y="3" rx="2" ry="2" stroke-width="1.5"/><path d="M9 14l2 2 4-4" stroke-width="1.5"/></svg>
              <div class="flex flex-col">
                <span class="text-white font-bold text-[17px] leading-tight">15+</span>
                <span class="text-[#94A3B8] text-[11px] font-medium mt-0.5 tracking-wide">Projects Completed</span>
              </div>
            </div>
            
            <div class="w-px h-8 bg-white/10"></div>
            
            <!-- Stat 3 -->
            <div class="flex items-center gap-3 group">
              <svg class="w-7 h-7 text-[#00D9FF] opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke-width="1.5"/><line x1="9" x2="9.01" y1="9" y2="9" stroke-width="2"/><line x1="15" x2="15.01" y1="9" y2="9" stroke-width="2"/></svg>
              <div class="flex flex-col">
                <span class="text-white font-bold text-[17px] leading-tight">100%</span>
                <span class="text-[#94A3B8] text-[11px] font-medium mt-0.5 tracking-wide">Client Satisfaction</span>
              </div>
            </div>
          </div>
          
        </div>
        
        <!-- RIGHT COLUMN (Portrait & Floating Elements) -->
        <div class="relative w-full h-[600px] lg:h-[750px] mt-10 lg:mt-0 flex items-center justify-center">
          
          <!-- Background Ambient Glow -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#7C3CFF]/30 rounded-full blur-[100px] z-0 pointer-events-none"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-[20%] -translate-y-[80%] w-[250px] h-[250px] bg-[#00D9FF]/20 rounded-full blur-[90px] z-0 pointer-events-none"></div>

          <!-- Abstract Glassmorphism Shapes -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[460px] aspect-[4/3] z-0">
            
            <!-- Main Glass Frame -->
            <div class="absolute inset-0 rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-[#A855F7]/80 via-[#1687FF]/20 to-[#00D9FF]/60 shadow-[0_0_50px_rgba(124,60,255,0.15)] opacity-80">
              <div class="w-full h-full rounded-[2.5rem] bg-[#030711]/40 backdrop-blur-[8px]"></div>
            </div>

            <!-- Inner Left Rounded Rectangle -->
            <div class="absolute top-[40%] left-[-5%] w-[160px] h-[120px] rounded-[1.5rem] p-[1.5px] bg-gradient-to-tr from-[#00D9FF]/50 to-transparent opacity-60">
              <div class="w-full h-full rounded-[1.5rem] bg-white/[0.02] backdrop-blur-md"></div>
            </div>
            
            <!-- Right Abstract Curve (Simulated) -->
            <div class="absolute top-[20%] right-[-10%] w-[200px] h-[180px] border-r-2 border-b-2 border-[#1687FF]/30 rounded-full opacity-50 blur-[1px]"></div>
            
          </div>

          <!-- Floating Orbs -->
          <div class="absolute top-[35%] right-[10%] w-3.5 h-3.5 rounded-full bg-[#A855F7] shadow-[0_0_15px_#A855F7] z-10 animate-[pulse_3s_ease-in-out_infinite]"></div>
          <div class="absolute bottom-[40%] left-[5%] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF] z-10 animate-[pulse_4s_ease-in-out_infinite]" style="animation-delay: 1s;"></div>

          <!-- Main Portrait -->
          <div class="relative z-20 w-full h-full flex items-end justify-center">
            <img 
              src="${profileImgUrl}" 
              alt="Hero Portrait" 
              class="w-auto h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] object-bottom"
              style="max-height: 90%; mask-image: linear-gradient(to top, transparent 0%, black 15%); -webkit-mask-image: linear-gradient(to top, transparent 0%, black 15%);"
              onerror="this.src='/images/rifat-hero.png'"
            />
          </div>

          <!-- "Available for Work" Pill -->
          <div class="absolute bottom-[18%] right-[5%] sm:right-[10%] lg:right-[5%] xl:right-[-5%] z-30 bg-[#0A1121]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:px-5 sm:py-4 flex flex-col gap-1 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div class="flex items-center gap-2.5">
              <div class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </div>
              <span class="text-white font-semibold text-[13px] sm:text-[14px] tracking-wide">Available for work</span>
            </div>
            <span class="text-[#94A3B8] text-[11px] sm:text-[12px] font-medium ml-[18px]">Let's build something great</span>
          </div>
          
        </div>

      </div>

      <!-- Scroll Indicator (Far Right Edge) -->
      <div class="absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30 hidden xl:flex opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <div class="w-1.5 h-1.5 bg-[#00D9FF] rounded-full shadow-[0_0_8px_#00D9FF]"></div>
        <div class="w-1 h-1 bg-white/40 rounded-full"></div>
        <div class="w-1 h-1 bg-white/20 rounded-full"></div>
        <span class="text-[#94A3B8] text-[10px] font-medium tracking-[0.2em] uppercase mt-2 rotate-180" style="writing-mode: vertical-rl;">Scroll Down</span>
        <a href="#about" class="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white mt-3 hover:border-[#00D9FF] hover:text-[#00D9FF] transition-colors bg-white/5 backdrop-blur-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </a>
      </div>

    </section>
  `;
}

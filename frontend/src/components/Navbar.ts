import { api } from '../services/api';

export function renderNavbar(currentPath: string = '/'): string {
  const isAdmin = Boolean(api.getToken());

  return `
    <header id="main-header" class="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1250px] h-[72px] z-50 transition-all duration-500 bg-[#0a1122]/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_0_30px_rgba(0,217,255,0.05)] rounded-[22px] px-6 sm:px-8 flex items-center justify-between">
      
      <!-- LEFT: Logo & Name -->
      <a href="#/" class="group flex items-center gap-4">
        <!-- Circular Logo -->
        <div class="w-11 h-11 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-500/10 shadow-[0_0_15px_rgba(0,217,255,0.2)] transition-transform duration-500 group-hover:scale-105">
          <span class="font-bold text-cyan-400 text-lg font-sans">R</span>
        </div>
        <!-- Name & Title -->
        <div class="hidden sm:flex flex-col">
          <span class="font-bold tracking-tight text-white text-[15px] leading-tight group-hover:text-cyan-300 transition-colors">Md Iftakhar Ahmed Rifat</span>
          <span class="text-slate-400 text-[11px] font-medium leading-tight mt-0.5">Full-Stack Web Developer</span>
        </div>
      </a>

      <!-- CENTER: Navigation Links -->
      <nav class="hidden lg:flex items-center gap-6 xl:gap-10">
        <a href="#/home" class="relative text-[14px] font-medium text-white transition-colors">
          Home
          <!-- Active state underline -->
          <span class="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(0,217,255,0.6)]"></span>
        </a>
        <a href="#/about" class="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">About</a>
        <a href="#/services" class="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Services</a>
        <a href="#/projects" class="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Work</a>
        <a href="#/contact" class="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Contact</a>
      </nav>

      <!-- RIGHT: CTA -->
      <div class="hidden md:flex items-center gap-4">
        ${isAdmin ? `
          <a href="#/admin" class="px-3 py-1.5 text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full hover:bg-emerald-500/30 transition-all">
            Admin
          </a>
        ` : ''}
        <a href="#/contact" class="px-6 py-2.5 rounded-full font-semibold text-[13px] text-white bg-transparent border border-cyan-500/30 hover:border-transparent relative group overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(0,217,255,0.1)] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:-translate-y-[1px] flex items-center gap-2">
          <!-- Gradient Background Hover/Base -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 group-hover:opacity-100 opacity-50 transition-opacity"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#7C3CFF] opacity-0 group-hover:opacity-100 transition-opacity blur-[2px] -z-10"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#00D9FF] to-[#7C3CFF] opacity-0 group-hover:opacity-10 transition-opacity"></div>
          
          <span class="relative z-10">Let's Talk</span>
          <svg class="relative z-10 w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>

      <!-- Mobile Hamburger Menu Button -->
      <button id="mobile-menu-btn" class="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none relative z-10">
        <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Mobile Dropdown Drawer -->
      <div id="mobile-menu" class="hidden lg:hidden absolute top-[85px] left-0 w-full flex-col gap-4 bg-[#0a1122]/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/[0.05]">
        <a href="#/home" class="mobile-nav-link text-base font-medium text-cyan-400 py-2 border-b border-white/5">Home</a>
        <a href="#/about" class="mobile-nav-link text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">About</a>
        <a href="#/services" class="mobile-nav-link text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Services</a>
        <a href="#/projects" class="mobile-nav-link text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Work</a>
        <a href="#/contact" class="mobile-nav-link text-base font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Contact</a>
        <div class="flex flex-col gap-3 pt-4">
          <a href="#/contact" class="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#00D9FF] to-[#7C3CFF] rounded-xl shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (btn && menu) {
    btn.onclick = () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
      hamburgerIcon?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');
    };
  }

  // Mobile navigation link click dismiss
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    (link as HTMLElement).onclick = () => {
      menu?.classList.add('hidden');
      menu?.classList.remove('flex');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    };
  });

  // Header scroll backdrop effect
  const header = document.getElementById('main-header');
  window.onscroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('shadow-xl', 'bg-[#030711]/95', 'border-cyan-500/10');
    } else {
      header?.classList.remove('shadow-xl', 'bg-[#030711]/95', 'border-cyan-500/10');
    }
  };
}

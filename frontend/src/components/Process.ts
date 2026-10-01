import { ProcessStepItem } from '../types';

export function renderProcess(): string {
  // Hardcoding the process steps to perfectly match the design image
  const steps = [
    {
      num: '01',
      category: 'DISCOVERY',
      title: 'Discover',
      desc: 'Analyzing requirements, understanding user needs, defining scope, and mapping architectural goals.',
      icon: `<svg class="w-6 h-6 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`
    },
    {
      num: '02',
      category: 'ARCHITECTURE',
      title: 'Plan',
      desc: 'Designing database ER diagrams, API endpoint contracts, component structure, and technical milestones.',
      icon: `<svg class="w-6 h-6 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`
    },
    {
      num: '03',
      category: 'INTERFACE',
      title: 'Design',
      desc: 'Creating wireframes, UI design tokens, color hierarchy, and high-fidelity interactive prototypes.',
      icon: `<svg class="w-6 h-6 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 9h16M9 20V9"/></svg>`
    },
    {
      num: '04',
      category: 'ENGINEERING',
      title: 'Develop',
      desc: 'Writing modular, type-safe code using HTML5, Tailwind CSS, TypeScript, Node.js, Express, and Prisma.',
      icon: `<div class="text-[#00D9FF] font-bold text-lg leading-none">&lt;/&gt;</div>`
    },
    {
      num: '05',
      category: 'QA',
      title: 'Test',
      desc: 'Rigorously verifying API security, edge cases, responsive breakpoints, mobile overflow, and performance.',
      icon: `<svg class="w-6 h-6 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
    },
    {
      num: '06',
      category: 'PRODUCTION',
      title: 'Deploy',
      desc: 'Configuring Vercel frontend deployments, production Node servers, environment security, and SSL.',
      icon: `<svg class="w-6 h-6 text-[#00D9FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 11v6m0-6l-3 3m3-3l3 3"/></svg>`
    }
  ];

  return `
    <section id="process" class="py-24 px-4 sm:px-8 relative bg-[#030711] border-t border-white/5 overflow-hidden">
      <!-- Ambient Background Glows -->
      <div class="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-[#00D9FF]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div class="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#7C3CFF]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      <!-- Subtle Grid Background -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNjBoNjBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwdjYwaDYwVjBIMHptNTkgNTlIMVYxX2g1OHY1OHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div class="max-w-[1250px] mx-auto relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col items-center text-center space-y-4 mb-20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-[#00D9FF]/50"></div>
            <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.25em] uppercase">My Process</span>
            <div class="w-12 h-px bg-gradient-to-l from-transparent to-[#00D9FF]/50"></div>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            <span class="text-white">How I</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">Work</span>
          </h2>
          <p class="text-[#94A3B8] text-[15px] max-w-lg mx-auto font-medium">
            A clear, structured workflow from first idea to production.
          </p>
        </div>

        <!-- Timeline Grid Container -->
        <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-6 lg:gap-x-10 mt-10">
          
          <!-- Connecting Lines (Desktop only) -->
          <div class="hidden lg:block absolute top-[1.25rem] left-[5%] right-[5%] h-[1px] bg-[#00D9FF]/20 z-0"></div>
          <div class="hidden lg:block absolute bottom-[calc(50%-1.25rem)] left-[5%] right-[5%] h-[1px] bg-[#00D9FF]/20 z-0"></div>
          
          <!-- Animated glowing dot on line (visual flair) -->
          <div class="hidden lg:block absolute top-[1.25rem] left-[20%] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF] z-0 -translate-y-1/2 animate-pulse"></div>

          ${steps.map((step, idx) => {
            const isDeploy = step.num === '06';
            
            // Build the card border based on if it's the final Deploy step
            let cardWrapperClasses = "pt-5 relative group z-10 h-full flex flex-col";
            let cardClasses = "bg-[#0A1223]/80 backdrop-blur-md rounded-[14px] p-6 sm:p-8 flex flex-col flex-1 relative overflow-hidden transition-all duration-300 ";
            
            if (isDeploy) {
              // Special glowing border wrapper for Deploy step
              cardWrapperClasses += " p-[1.5px] rounded-[15px] bg-gradient-to-br from-[#00D9FF] to-[#A855F7] shadow-[0_15px_40px_rgba(124,60,255,0.2)]";
              cardClasses += " bg-[#050914] hover:bg-[#080d1c]";
            } else {
              cardClasses += " border border-white/10 hover:border-[#00D9FF]/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(0,217,255,0.1)]";
            }

            return `
              <div class="relative flex flex-col h-full">
                
                <!-- Number Circle intersecting top border -->
                <div class="absolute top-0 left-6 sm:left-8 w-10 h-10 rounded-full border-[1.5px] border-[#00D9FF] bg-[#060B14] z-20 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.2)] group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white font-bold text-[13px] tracking-wider">${step.num}</span>
                </div>

                <!-- Card Body -->
                <div class="${cardWrapperClasses}">
                  <div class="${cardClasses}">
                    
                    <!-- Top section: Icon and Category -->
                    <div class="flex items-start gap-4 mb-5 mt-2">
                      <!-- Icon Box -->
                      <div class="w-12 h-12 rounded-[10px] border border-[#00D9FF]/20 bg-[#00D9FF]/5 flex items-center justify-center shrink-0 group-hover:border-[#00D9FF]/40 group-hover:bg-[#00D9FF]/10 transition-colors">
                        ${step.icon}
                      </div>
                      
                      <!-- Category Tag -->
                      <div class="mt-1 flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#00D9FF]"></div>
                        <span class="text-[#00D9FF] font-bold text-[9px] tracking-[0.2em] uppercase">${step.category}</span>
                        <span class="text-[#00D9FF]/60 text-[9px] font-black">></span>
                      </div>
                    </div>

                    <!-- Title & Description -->
                    <h3 class="text-white font-bold text-[22px] tracking-tight mb-3 group-hover:text-[#00D9FF] transition-colors">
                      ${step.title}
                    </h3>
                    <p class="text-[#7C8B9E] text-[13px] leading-[1.6] font-medium">
                      ${step.desc}
                    </p>
                    
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

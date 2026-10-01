export function renderServices(): string {
  // Hardcoded to match the reference image exactly
  const smallCards = [
    { num: '02', title: 'Frontend Development', desc: 'I create pixel-perfect, responsive user interfaces using modern technologies like React, Next.js, and Tailwind CSS.', icon: 'browser' },
    { num: '03', title: 'Full-Stack Development', desc: 'I handle both frontend and backend development, building complete web applications with modern tech stacks.', icon: 'server' },
    { num: '04', title: 'UI/UX Implementation', desc: 'I transform designs into responsive, accessible, and interactive web interfaces.', icon: 'pen' },
    { num: '05', title: 'Website Optimization', desc: 'I improve website speed, performance, and SEO to deliver a better user experience and higher rankings.', icon: 'speed' },
    { num: '06', title: 'Custom Web Applications', desc: 'I build tailored web solutions for unique business needs, from idea to deployment.', icon: 'cube' }
  ];

  const getIconSvg = (iconName: string) => {
    switch (iconName) {
      case 'browser':
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="12" y1="11" x2="12" y2="17"/></svg>`;
      case 'server':
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="6" rx="1"/><rect x="4" y="14" width="16" height="6" rx="1"/><path d="M8 7h.01M8 17h.01"/></svg>`;
      case 'pen':
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`;
      case 'speed':
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2"/></svg>`;
      case 'cube':
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7.523l-8 4.618-8-4.618M20 7.523L12 3 4 7.523M20 7.523v9.236l-8 4.618-8-4.618V7.523M12 12.141v9.236"/></svg>`;
      default:
        return `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    }
  };

  return `
    <section id="services" class="py-24 px-4 sm:px-8 relative bg-[#030711] overflow-hidden">
      <!-- Ambient Background Glows -->
      <div class="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#00D9FF]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div class="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[#A855F7]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      
      <!-- Side Rotated Text (Hidden on smaller screens) -->
      <div class="hidden 2xl:flex absolute left-[-80px] top-[40%] -rotate-90 items-center gap-4 text-[#1E293B] text-[10px] tracking-[0.3em] font-bold whitespace-nowrap">
        <span>CLEAN CODE</span>
        <span class="text-[#00D9FF]/30">•</span>
        <span>MODERN TECH</span>
        <span class="text-[#00D9FF]/30">•</span>
        <span>REAL IMPACT</span>
      </div>

      <!-- Left Side Dot Pattern -->
      <div class="hidden 2xl:block absolute left-8 top-[70%] w-6 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')]"></div>

      <div class="max-w-[1300px] mx-auto relative z-10 w-full">
        
        <!-- Header -->
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <!-- Title Side -->
          <div class="flex flex-col items-start space-y-3">
            <div class="flex items-center gap-4">
              <span class="text-[#00D9FF] font-bold text-[10px] tracking-[0.25em] uppercase">WHAT I DO</span>
              <div class="w-10 h-px bg-gradient-to-r from-[#00D9FF]/80 to-transparent"></div>
            </div>
            <h2 class="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1]">
              <span class="text-white">Services I </span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#00A3FF]">Offer</span>
            </h2>
          </div>
          
          <!-- Right Description & Circles -->
          <div class="flex flex-col items-end gap-6">
            <!-- Intersecting Circles -->
            <div class="hidden md:flex items-center mr-2">
              <div class="w-7 h-7 rounded-full border border-[#00D9FF]/40 -mr-3 mix-blend-screen"></div>
              <div class="w-7 h-7 rounded-full border border-[#A855F7]/40 -mr-3 mix-blend-screen"></div>
              <div class="w-7 h-7 rounded-full border border-white/20 mix-blend-screen"></div>
            </div>
            <!-- Paragraph -->
            <div class="border-l-[2px] border-[#00D9FF]/50 pl-5 py-1">
              <p class="text-[#94A3B8] text-[13px] sm:text-[14px] max-w-[320px] font-medium leading-[1.6]">
                I build high-performance, responsive, and modern digital products that help businesses grow and create real value.
              </p>
            </div>
          </div>
        </div>

        <!-- Main Layout: 1 Large Card (Left) + 5 Small Cards (Right) -->
        <div class="flex flex-col lg:flex-row gap-6">
          
          <!-- LEFT: Large Featured Card -->
          <div class="w-full lg:w-[32%] flex">
            <div class="w-full p-[1.5px] rounded-[24px] bg-gradient-to-b from-[#00D9FF] to-[#A855F7] shadow-[0_15px_40px_rgba(0,217,255,0.15)] group relative flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div class="bg-[#050914] rounded-[23px] p-6 sm:p-8 flex flex-col h-full relative overflow-hidden">
                <!-- Inner Glow -->
                <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#00D9FF]/20 to-transparent pointer-events-none"></div>
                
                <div class="relative z-10 flex flex-col h-full">
                  <!-- Header Row -->
                  <div class="flex justify-between items-center mb-8">
                    <div class="px-3 py-1 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 text-[11px] text-[#00D9FF] font-mono">01</div>
                    <div class="text-[#00D9FF]/50 font-mono text-sm">&lt;/&gt;</div>
                  </div>

                  <!-- Icon -->
                  <div class="w-14 h-14 rounded-xl border border-[#00D9FF]/30 bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] mb-6">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                  </div>

                  <h3 class="text-white font-bold text-2xl sm:text-[28px] tracking-tight mb-4">Web Development</h3>
                  <p class="text-[#7C8B9E] text-[14px] leading-[1.6] mb-8 font-medium pr-4">
                    I build modern, fast and scalable web applications with clean code and beautiful user experiences.
                  </p>

                  <button class="w-fit px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-[13px] font-semibold flex items-center gap-2 transition-all">
                    Learn More 
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>

                  <!-- 3D CSS Window Graphic -->
                  <div class="mt-auto pt-8 relative h-40 w-full perspective-1000">
                    <div class="absolute bottom-[-20px] -right-4 w-[110%] h-36 bg-[#0A1223]/90 border border-white/10 rounded-t-[16px] shadow-2xl overflow-hidden transform rotateX-[15deg] rotateY-[-10deg] rotateZ-[5deg] backdrop-blur-xl group-hover:rotateX-[10deg] transition-transform duration-500">
                      <!-- Window Header -->
                      <div class="h-6 border-b border-white/5 flex items-center px-3 gap-1.5 bg-black/20">
                        <div class="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                        <div class="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                        <div class="w-2 h-2 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <!-- Lines -->
                      <div class="p-4 space-y-3">
                        <div class="w-3/4 h-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-transparent opacity-80"></div>
                        <div class="w-1/2 h-2 rounded-full bg-gradient-to-r from-[#A855F7] to-transparent opacity-80"></div>
                        <div class="w-5/6 h-1.5 rounded-full bg-white/10 mt-4"></div>
                        <div class="w-4/6 h-1.5 rounded-full bg-white/10"></div>
                        <div class="w-2/6 h-1.5 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                    <!-- Floating Code Box -->
                    <div class="absolute bottom-6 right-2 w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#00D9FF]/20 to-[#A855F7]/20 border border-[#00D9FF]/30 backdrop-blur-md flex items-center justify-center text-[#00D9FF] font-bold text-xs shadow-lg transform rotate-[10deg] group-hover:rotate-0 group-hover:-translate-y-2 transition-all duration-500">
                      &lt;/&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- RIGHT: 5 Small Cards Grid -->
          <div class="w-full lg:w-[68%] flex flex-col gap-6">
            
            <!-- Top Row: 2 Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              ${smallCards.slice(0, 2).map(card => `
                <div class="bg-[#060B14] border border-white/10 hover:border-[#00D9FF]/30 rounded-[20px] p-6 sm:p-7 relative group overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,217,255,0.08)] flex flex-col h-full hover:-translate-y-1">
                  <!-- Subtle Grid BG -->
                  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBWMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDE5aDIwTTE5IDB2MjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PC9zdmc+')] opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity"></div>
                  
                  <!-- Number -->
                  <div class="mb-5 w-fit px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-white font-mono flex items-center gap-1.5 relative z-10">
                    <div class="w-[3px] h-[3px] rounded-full bg-[#00D9FF]"></div>
                    ${card.num}
                  </div>

                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-[12px] border border-[#00D9FF]/20 bg-[#00D9FF]/5 flex items-center justify-center text-[#00D9FF] mb-5 group-hover:bg-[#00D9FF]/10 group-hover:scale-110 transition-all duration-300 relative z-10">
                    ${getIconSvg(card.icon)}
                  </div>

                  <!-- Content -->
                  <h3 class="text-white font-bold text-[18px] mb-2.5 tracking-tight relative z-10 group-hover:text-[#00D9FF] transition-colors">${card.title}</h3>
                  <p class="text-[#7C8B9E] text-[13px] leading-[1.6] mb-8 font-medium relative z-10 pr-4">${card.desc}</p>

                  <!-- Footer -->
                  <div class="mt-auto flex items-center justify-between relative z-10">
                    <button class="text-[#00D9FF] text-[13px] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Learn More <span class="text-lg leading-none font-normal">&rarr;</span>
                    </button>
                    <div class="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#00D9FF] group-hover:border-[#00D9FF] group-hover:text-[#060B14] transition-colors shadow-sm">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 19L20 5m0 0H9m11 0v11"/></svg>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Bottom Row: 3 Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              ${smallCards.slice(2, 5).map(card => `
                <div class="bg-[#060B14] border border-white/10 hover:border-[#00D9FF]/30 rounded-[20px] p-6 relative group overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,217,255,0.08)] flex flex-col h-full hover:-translate-y-1">
                  <!-- Subtle Grid BG -->
                  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBWMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDE5aDIwTTE5IDB2MjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PC9zdmc+')] opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity"></div>
                  
                  <div class="mb-5 w-fit px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-white font-mono flex items-center gap-1.5 relative z-10">
                    <div class="w-[3px] h-[3px] rounded-full bg-[#A855F7]"></div>
                    ${card.num}
                  </div>

                  <div class="w-11 h-11 rounded-[10px] border border-[#A855F7]/20 bg-[#A855F7]/5 flex items-center justify-center text-[#A855F7] mb-4 group-hover:bg-[#A855F7]/10 group-hover:scale-110 transition-all duration-300 relative z-10">
                    ${getIconSvg(card.icon)}
                  </div>

                  <h3 class="text-white font-bold text-[16px] mb-2.5 tracking-tight relative z-10 group-hover:text-[#00D9FF] transition-colors">${card.title}</h3>
                  <p class="text-[#7C8B9E] text-[12px] leading-[1.6] mb-8 font-medium relative z-10 pr-2">${card.desc}</p>

                  <div class="mt-auto flex items-center justify-between relative z-10">
                    <button class="text-[#00D9FF] text-[12px] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Learn More <span class="text-lg leading-none font-normal">&rarr;</span>
                    </button>
                    <div class="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#00D9FF] group-hover:border-[#00D9FF] group-hover:text-[#060B14] transition-colors shadow-sm">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 19L20 5m0 0H9m11 0v11"/></svg>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
          </div>
        </div>

        <!-- Bottom Call to Action Banner -->
        <div class="mt-12 bg-gradient-to-r from-[#060B14] to-[#0A1223] border border-white/10 rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-xl">
          <!-- Subtle Glow -->
          <div class="absolute left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#00D9FF]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex flex-col md:flex-row items-center md:gap-10 gap-6 w-full md:w-auto relative z-10">
            <!-- Left Icon & Text -->
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/5 flex items-center justify-center text-[#00D9FF]">
                <svg class="w-5 h-5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight">
                <span class="text-white">Have a </span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#FF55B8]">project in mind?</span>
              </h3>
            </div>
            
            <!-- Divider & Paragraph -->
            <div class="hidden md:block w-px h-10 bg-white/10"></div>
            <p class="text-[#7C8B9E] text-[13.5px] font-medium md:max-w-[280px] text-center md:text-left">
              Let's turn your ideas into fast, scalable and impactful web solutions.
            </p>
          </div>

          <!-- Right Button -->
          <a href="#contact" class="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-white font-bold text-[14px] flex items-center gap-2 shadow-[0_0_20px_rgba(124,60,255,0.4)] hover:shadow-[0_0_30px_rgba(124,60,255,0.6)] hover:-translate-y-1 transition-all duration-300 relative z-10 group whitespace-nowrap">
            Let's build it 
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>

      </div>
    </section>
  `;
}

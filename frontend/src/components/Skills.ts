import { SkillItem } from '../types';

export function renderSkills(skills: SkillItem[]): string {
  // Using explicit structured data to perfectly match the design image
  const skillCards = [
    {
      name: 'HTML5',
      color: '#E34F26',
      desc: 'Semantic & accessible markup.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#E34F26] drop-shadow-[0_0_8px_rgba(227,79,38,0.5)]"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm17 5.1H5.5l.3 3.4h11l-.3 3.4-6 1.7-6-1.7-.2-2h-3l.4 4.5 8.8 2.5 8.8-2.5.8-9.3z"/><text x="12" y="16" fill="white" font-family="sans-serif" font-weight="900" font-size="9" text-anchor="middle">5</text></svg>`
    },
    {
      name: 'CSS3',
      color: '#1572B6',
      desc: 'Modern, responsive styling.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#1572B6] drop-shadow-[0_0_8px_rgba(21,114,182,0.5)]"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm17 5.1H5.5l.3 3.4h11l-.3 3.4-6 1.7-6-1.7-.2-2h-3l.4 4.5 8.8 2.5 8.8-2.5.8-9.3z"/><text x="12" y="16" fill="white" font-family="sans-serif" font-weight="900" font-size="9" text-anchor="middle">3</text></svg>`
    },
    {
      name: 'JavaScript',
      color: '#F7DF1E',
      desc: 'Dynamic and interactive web apps.',
      icon: `<div class="w-9 h-9 bg-[#F7DF1E] rounded-md flex items-end justify-end p-0.5 shadow-[0_0_10px_rgba(247,223,30,0.3)]"><span class="text-black font-black text-[18px] leading-none">JS</span></div>`
    },
    {
      name: 'React',
      color: '#61DAFB',
      desc: 'Component-based UI library.',
      icon: `<svg viewBox="-11.5 -10.23174 23 20.46348" class="w-9 h-9 drop-shadow-[0_0_8px_rgba(97,218,251,0.5)]"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.2" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`
    },
    {
      name: 'Next.js',
      color: '#FFFFFF',
      desc: 'SSR, SSG & modern React framework.',
      icon: `<div class="w-9 h-9 rounded-full border-[1.5px] border-white flex items-center justify-center font-bold text-white text-[16px] drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">N</div>`
    },
    {
      name: 'Tailwind CSS',
      color: '#38B2AC',
      desc: 'Utility-first CSS framework.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#38B2AC] drop-shadow-[0_0_8px_rgba(56,178,172,0.5)]"><path d="M12 6.5C10 4.5 8 4 6 5.5c-2 1.5-2.5 4-1 6s4.5 2.5 6.5 1c2-1.5 2.5-4 1-6zm-6 9C4 13.5 2 13 0 14.5c-2 1.5-2.5 4-1 6s4.5 2.5 6.5 1c2-1.5 2.5-4 1-6z" transform="translate(6, 1)"/></svg>`
    },
    {
      name: 'Node.js',
      color: '#339933',
      desc: 'Backend & API development.',
      icon: `<div class="w-9 h-9 border-2 border-[#339933] rounded-md flex items-center justify-center shadow-[0_0_8px_rgba(51,153,51,0.4)]"><span class="text-[#339933] font-bold text-[14px]">JS</span></div>`
    },
    {
      name: 'Express.js',
      color: '#9CA3AF',
      desc: 'Fast & minimal Node framework.',
      icon: `<div class="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center font-bold text-gray-300 text-[14px] bg-white/5">ex</div>`
    },
    {
      name: 'MongoDB',
      color: '#47A248',
      desc: 'Flexible and scalable NoSQL database.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#47A248] drop-shadow-[0_0_8px_rgba(71,162,72,0.5)]"><path d="M11.8 1.4c-2.4 2.1-4 5.3-4 8.7 0 3.2 1.4 6.2 3.6 8.5v3.9l.4.1.4-.1v-3.9c2.3-2.3 3.6-5.3 3.6-8.5 0-3.4-1.6-6.6-4-8.7z"/></svg>`
    },
    {
      name: 'MySQL',
      color: '#4479A1',
      desc: 'Reliable relational database.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#00D9FF] drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]"><path d="M20 7h-1.2A5.9 5.9 0 0 0 13 2H9C6 2 4 4.5 4 8c0 1.5.7 2.8 1.8 3.6A6 6 0 0 0 4 17a5 5 0 0 0 5 5h4c3.9 0 7-3.1 7-7 0-1.7-.6-3.3-1.6-4.6A4.8 4.8 0 0 0 20 7zM9 13.5H7.5V11H9v2.5zm6-5h-2V6h2v2.5z"/></svg>`
    },
    {
      name: 'Git',
      color: '#F05032',
      desc: 'Version control and collaboration.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#F05032] drop-shadow-[0_0_8px_rgba(240,80,50,0.5)]"><path d="M23.5 11L13 .5c-.6-.6-1.5-.6-2.1 0l-1.9 1.9 2.5 2.5c.7-.1 1.4.3 1.6.9l2.7 2.7c.6.2 1 .8.9 1.6-.1.8-.8 1.4-1.6 1.4-.9-.1-1.5-.8-1.5-1.7 0-.3.1-.6.3-.8l-2.7-2.7V14c.2.2.3.5.3.8 0 .9-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.3-1.1.8-1.4V6.9c-.5-.2-.8-.7-.8-1.3 0-.9.7-1.5 1.5-1.5.6 0 1.1.3 1.4.8l2-2c-1.2-1.2-3-1.2-4.2 0L.5 11c-1.2 1.2-1.2 3 0 4.2l10.5 10.5c1.2 1.2 3 1.2 4.2 0l10.5-10.5c1.2-1.2 1.2-3 0-4.2z"/></svg>`
    },
    {
      name: 'GitHub',
      color: '#FFFFFF',
      desc: 'Code hosting & team collaboration.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-white drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>`
    },
    {
      name: 'Figma',
      color: '#F24E1E',
      desc: 'Design to code workflow.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 drop-shadow-[0_0_8px_rgba(242,78,30,0.3)]"><path fill="#F24E1E" d="M8 0h4a4 4 0 1 1 0 8H8a4 4 0 1 1 0-8z"/><path fill="#A259FF" d="M8 8h4a4 4 0 1 1 0 8H8a4 4 0 1 1 0-8z"/><path fill="#1ABCFE" d="M12 8h4a4 4 0 1 1 0 8h-4V8z"/><path fill="#0ACF83" d="M8 16h4a4 4 0 1 1-4 4v-4z"/></svg>`
    },
    {
      name: 'VS Code',
      color: '#007ACC',
      desc: 'My favorite code editor.',
      icon: `<svg viewBox="0 0 24 24" class="w-9 h-9 fill-[#00D9FF] drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]"><path d="M18.8 1.9l-13 7.8-3.4-2.8c-.5-.4-1.2-.2-1.5.3-.2.3-.2.8.1 1l4.4 3.7-4.4 3.6c-.4.3-.4.8-.1 1 .3.4 1 .6 1.5.3l3.4-2.8 13 7.8c1.3.8 3.2.1 3.2-1.5v-17c0-1.6-1.9-2.3-3.2-1.4zM16 17.6L9.4 12 16 6.4v11.2z"/></svg>`
    }
  ];

  return `
    <section id="skills" class="py-24 px-4 sm:px-8 relative bg-[#030711] border-t border-white/5 overflow-hidden">
      <!-- Background Ambient Glows -->
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00D9FF]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7C3CFF]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div class="max-w-[1350px] mx-auto relative z-10">
        
        <!-- Header Top Row -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          
          <!-- Left: Titles -->
          <div class="flex flex-col items-start relative z-20">
            <!-- Pill -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/5 mb-5 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
              <span class="text-[#00D9FF] text-[9px] font-black tracking-[0.25em] uppercase pl-1">My Tech Stack</span>
            </div>
            
            <h2 class="text-white text-5xl sm:text-6xl font-black tracking-tight leading-none mb-1 shadow-black drop-shadow-xl">
              Technologies
            </h2>
            <div class="relative">
              <h2 class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-5xl sm:text-6xl font-black tracking-tight leading-none">
                I Use
              </h2>
              <!-- Custom Underline Swoosh -->
              <svg class="absolute -bottom-4 left-0 w-32 h-4 text-[#A855F7]" viewBox="0 0 100 20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
                <path d="M5 10 Q 40 -5, 95 15" />
              </svg>
            </div>
          </div>

          <!-- Middle: Description Block -->
          <div class="flex items-start gap-4 lg:ml-auto max-w-xs relative z-20">
            <div class="w-12 h-10 rounded-lg border border-[#00D9FF]/30 bg-[#0A1223]/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.15)] shrink-0">
              <span class="text-[#00D9FF] font-mono font-bold text-[14px]">&lt;/&gt;</span>
            </div>
            <p class="text-[#94A3B8] text-[13px] leading-relaxed mt-0.5">
              I work with modern technologies and tools to build fast, scalable and future-ready web applications.
            </p>
          </div>

          <!-- Right: Floating Abstract Laptop Illustration -->
          <div class="hidden xl:flex items-center justify-center relative w-[300px] h-[150px] z-10 shrink-0 perspective-1000">
            <!-- Glowing Laptop CSS Art -->
            <div class="relative w-48 h-32 transform rotate-x-[10deg] -rotate-y-[20deg] rotate-z-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <!-- Screen Base -->
              <div class="absolute inset-0 bg-[#060B14] rounded-lg border-[1.5px] border-[#00D9FF]/40 shadow-[0_0_30px_rgba(0,217,255,0.3)] overflow-hidden">
                <!-- Top Bar -->
                <div class="h-4 bg-white/5 border-b border-[#00D9FF]/20 flex items-center gap-1 px-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  <div class="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                </div>
                <!-- Fake Code Lines -->
                <div class="p-3 flex flex-col gap-1.5 opacity-80">
                  <div class="h-1 w-20 bg-[#00D9FF]/60 rounded-full"></div>
                  <div class="h-1 w-16 bg-[#A855F7]/60 rounded-full ml-4"></div>
                  <div class="h-1 w-24 bg-white/40 rounded-full ml-4"></div>
                  <div class="h-1 w-12 bg-[#00D9FF]/60 rounded-full"></div>
                </div>
                <!-- Center Code Icon -->
                <div class="absolute bottom-4 right-4 bg-[#0A1223] border border-[#00D9FF]/50 p-2 rounded-md shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                  <span class="text-[#00D9FF] font-mono font-bold text-[14px]">&lt;/&gt;</span>
                </div>
              </div>
              <!-- Floating Rings -->
              <div class="absolute -top-4 -left-4 w-12 h-12 border border-[#7C3CFF]/40 rounded-full z-[-1]"></div>
              <div class="absolute -bottom-6 -right-6 w-24 h-24 border border-[#00D9FF]/20 rounded-full z-[-1]"></div>
            </div>
            
            <!-- Handwriting -->
            <div class="absolute -right-10 top-0 -rotate-[15deg]">
              <div class="font-serif italic text-[#00D9FF] text-[20px] leading-[1.1]" style="font-family: 'Brush Script MT', 'Comic Sans MS', cursive;">
                Better<br/>
                <span class="text-white">Code</span><br/>
                <span class="text-[#7C3CFF]">Bigger<br/>Impact</span>
              </div>
              <svg class="w-10 h-2 mt-1 text-[#00D9FF] opacity-80" viewBox="0 0 100 20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M5 10 Q 30 -5, 60 5 T 95 15"/></svg>
            </div>
          </div>
        </div>

        <!-- Skills Grid (14 items: 7 cols x 2 rows on large screens) -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-5 relative z-20">
          ${skillCards.map(skill => `
            <div class="bg-gradient-to-b from-[#0A1223]/90 to-[#0A1223]/40 backdrop-blur-md border border-white/5 hover:border-[#00D9FF]/30 rounded-[16px] p-5 flex flex-col relative group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,217,255,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-default">
              
              <!-- Subtle Inner Top Glow -->
              <div class="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <!-- Top Right Blue Cut/Accent -->
              <div class="absolute top-0 right-0 w-5 h-5 bg-gradient-to-bl from-[#00D9FF]/30 to-transparent opacity-60 rounded-tr-[16px] group-hover:opacity-100 transition-opacity"></div>
              
              <!-- Icon -->
              <div class="mb-4">
                ${skill.icon}
              </div>
              
              <!-- Content -->
              <div class="flex flex-col flex-1 mt-auto">
                <h3 class="text-white font-bold text-[14px] sm:text-[15px] tracking-tight">${skill.name}</h3>
                <p class="text-[#7C8B9E] text-[10px] sm:text-[11px] leading-[1.4] mt-1 pr-2">${skill.desc}</p>
              </div>
              
              <!-- Accent Line at bottom -->
              <div class="h-[3px] w-6 rounded-full mt-4 transition-all duration-300 group-hover:w-12 group-hover:shadow-[0_0_10px_currentColor]" style="background-color: ${skill.color}; box-shadow: 0 0 5px ${skill.color}40;"></div>
            </div>
          `).join('')}
        </div>

        <!-- Footer Action Area -->
        <div class="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-10">
          
          <!-- Explore Button -->
          <a href="#projects" class="px-7 py-3 rounded-full font-bold text-[13px] text-white bg-gradient-to-r from-[#00D9FF] to-[#A855F7] shadow-[0_0_20px_rgba(124,60,255,0.3)] hover:shadow-[0_0_30px_rgba(124,60,255,0.5)] transition-all flex items-center gap-2 group hover:-translate-y-0.5 whitespace-nowrap">
            <span>Explore My Projects</span>
            <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
          
          <!-- Middle Text -->
          <div class="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 text-[#00D9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            <span class="text-[#94A3B8] text-[12px] font-medium tracking-wide">Constantly learning, constantly building.</span>
          </div>
          
          <!-- Right Handwriting -->
          <div class="hidden md:block -rotate-[6deg] origin-right mr-4">
            <div class="font-serif italic text-[#7C3CFF] text-[18px] leading-[1.1] opacity-90" style="font-family: 'Brush Script MT', 'Comic Sans MS', cursive; text-shadow: 0 0 10px rgba(124,60,255,0.3);">
              More Skills<br/>
              More Possibilities
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

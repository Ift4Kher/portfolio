import { AboutData } from '../types';

export function renderAbout(about: AboutData): string {
  
  const approachCards = [
    { 
      num: '01', 
      title: 'Clean Engineering', 
      desc: 'Writing structured, maintainable code with scalable architecture and modern development practices.', 
      glowColor: 'from-[#00D9FF]', 
      iconColor: 'text-[#00D9FF]',
      shadowClass: 'group-hover:shadow-[0_0_10px_rgba(0,217,255,0.5)]',
      icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>` 
    },
    { 
      num: '02', 
      title: 'Product Thinking', 
      desc: 'Understanding the problem behind the project and building experiences that are useful, intuitive, and business-focused.', 
      glowColor: 'from-[#3B82F6]', 
      iconColor: 'text-[#3B82F6]',
      shadowClass: 'group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>` 
    },
    { 
      num: '03', 
      title: 'Reliable Delivery', 
      desc: 'From the first idea to deployment, I focus on performance, responsiveness, and a polished final product.', 
      glowColor: 'from-[#A855F7]', 
      iconColor: 'text-[#A855F7]',
      shadowClass: 'group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]',
      icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>` 
    }
  ];

  const badges = [
    { label: 'Clean Code', icon: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>` },
    { label: 'Problem Solving', icon: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>` },
    { label: 'Team Collaboration', icon: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>` },
    { label: 'Long-Term Support', icon: `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>` }
  ];

  return `
    <section id="about" class="py-24 px-4 sm:px-8 relative bg-[#030711] overflow-hidden">
      <!-- Background Accents -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#3B82F6]/10 via-[#A855F7]/5 to-transparent rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div class="absolute bottom-8 left-8 text-[#1A233A] text-2xl font-black tracking-widest select-none pointer-events-none">. . . . .<br>. . . . .<br>. . . . .</div>
      <div class="absolute bottom-8 right-8 text-[#1A233A] text-2xl font-black tracking-widest select-none pointer-events-none italic">/ / / / /</div>

      <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start relative z-10">
        
        <!-- Left Column: About Me -->
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <h4 class="text-[#00D9FF] font-bold text-[11px] tracking-[0.2em] uppercase">About Me</h4>
            <div class="h-[1px] w-12 bg-gradient-to-r from-[#00D9FF] to-transparent"></div>
          </div>
          
          <h2 class="text-[34px] sm:text-[42px] font-black text-white leading-[1.1] tracking-tight">
            I Build Digital Products<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">That Are Fast, Scalable &<br/>Built to Last.</span>
          </h2>
          
          <div class="space-y-5 text-[#7C8B9E] text-[13.5px] leading-relaxed">
            <p>
              I'm a Full-Stack Web Developer focused on building modern, high-performance web applications with clean architecture and thoughtful user experiences. I work across the frontend and backend to turn ideas, business requirements, and designs into reliable digital products.
            </p>
            <p>
              My approach combines clean, maintainable code with practical problem-solving. From responsive interfaces and REST APIs to database architecture and deployment I focus on building solutions that are not only visually polished, but also scalable, secure, and easy to maintain.
            </p>
          </div>

          <div class="pl-5 border-l-2 border-[#00D9FF] py-1">
            <p class="text-white text-[13px] font-semibold leading-relaxed max-w-sm">
              I care about the details, communicate clearly, and treat every project as a product — not just a piece of code.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
            <a href="#/contact" class="inline-flex w-fit px-7 py-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] text-white text-[13px] font-bold items-center gap-2 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all hover:scale-105">
              More About Me
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <div class="flex items-start gap-2.5">
              <div class="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <p class="text-[#7C8B9E] text-[11px] leading-[1.6]">Available for freelance projects<br/>& full-time opportunities</p>
            </div>
          </div>
        </div>

        <!-- Right Column: My Approach -->
        <div class="lg:border-l lg:border-[#1A233A] lg:pl-16 space-y-6">
          <div class="flex items-center gap-4">
            <h4 class="text-[#00D9FF] font-bold text-[11px] tracking-[0.2em] uppercase">My Approach</h4>
            <div class="h-[1px] w-12 bg-gradient-to-r from-[#00D9FF] to-transparent"></div>
          </div>

          <div class="space-y-4">
            ${approachCards.map(card => `
              <div class="relative bg-[#0A1223] border border-[#1A233A] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:bg-[#0C162C] transition-colors group">
                <!-- Glowing Left Border -->
                <div class="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b ${card.glowColor} to-transparent opacity-80 group-hover:opacity-100 ${card.shadowClass} transition-all"></div>
                
                <!-- Icon Box -->
                <div class="w-14 h-14 shrink-0 rounded-[14px] border border-white/5 bg-[#030711] flex items-center justify-center ${card.iconColor} shadow-inner">
                  ${card.icon}
                </div>

                <!-- Content -->
                <div class="flex-1 pr-6 sm:pr-10">
                  <div class="text-[11px] font-bold ${card.iconColor} mb-1">${card.num}</div>
                  <h5 class="text-white font-bold text-[15px] mb-1.5">${card.title}</h5>
                  <p class="text-[#7C8B9E] text-[12px] leading-[1.7]">${card.desc}</p>
                </div>

                <!-- Arrow -->
                <div class="w-8 h-8 hidden sm:flex shrink-0 rounded-full border border-[#1A233A] bg-[#030711] items-center justify-center text-[#7C8B9E] group-hover:text-white transition-colors absolute right-6 top-1/2 -translate-y-1/2">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Badges Divider & Container -->
          <div class="pt-4">
            <div class="h-px w-full bg-gradient-to-r from-[#1A233A] to-transparent mb-6"></div>
            <div class="flex flex-wrap gap-3">
              ${badges.map(badge => `
                <div class="px-3.5 py-1.5 rounded-full border border-[#1A233A] bg-[#0A1223] flex items-center gap-2 text-[10px] text-[#7C8B9E] hover:text-white hover:border-[#3B82F6]/30 transition-colors cursor-default">
                  <span class="text-[#3B82F6] opacity-70">${badge.icon}</span>
                  ${badge.label}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

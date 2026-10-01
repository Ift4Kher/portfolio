export function renderEducation(): string {
  const timelineData = [
    {
      startDate: '2024',
      endDate: 'PRESENT',
      isCurrent: true,
      label: 'EXPERIENCE',
      role: 'AI-ASSISTED FULL-STACK DEVELOPER',
      title: 'Full-Stack Web Developer',
      desc: 'Developing responsive and dynamic web applications, user authentication systems, administrative dashboards, and database-driven solutions using modern full-stack technologies and AI workflows.',
      iconHtml: `<div class="text-[#00D9FF] font-bold text-xl leading-none">&lt;/&gt;</div>`,
      iconWrapClass: 'border-[#00D9FF]/40 bg-[#00D9FF]/10',
      skills: 'HTML5 <span class="text-white/20 mx-1.5">/</span> CSS3 <span class="text-white/20 mx-1.5">/</span> JavaScript <span class="text-white/20 mx-1.5">/</span> TypeScript<br/>Node.js <span class="text-white/20 mx-1.5">/</span> MySQL <span class="text-white/20 mx-1.5">/</span> PHP <span class="text-white/20 mx-1.5">/</span> Git'
    },
    {
      startDate: '2023',
      endDate: '2024',
      isCurrent: false,
      label: 'TRAINING',
      role: 'PROFESSIONAL CERTIFICATION',
      title: 'UY LAB',
      desc: 'Completed Professional Graphic Design Course. Skilled in UI/UX design principles, promotional banners, marketing materials, social media graphics, Canva, and Adobe Photoshop.',
      iconHtml: `<svg class="w-6 h-6 text-[#EC4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>`,
      iconWrapClass: 'border-[#EC4899]/30 bg-[#EC4899]/5',
      skills: null
    },
    {
      startDate: '2020',
      endDate: '2024',
      isCurrent: false,
      label: 'EDUCATION',
      role: 'BSc IN COMPUTER SCIENCE & ENGINEERING',
      title: 'Eastern University',
      desc: 'Completed Bachelor of Science in CSE with CGPA 2.72. Comprehensive coursework in Software Engineering, Database Management Systems, Data Structures & Algorithms, Web Technologies, and Computer Networks.',
      iconHtml: `<svg class="w-7 h-7 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7"/></svg>`,
      iconWrapClass: 'border-white/10 bg-white/5',
      skills: null
    },
    {
      startDate: '2018',
      endDate: '2020',
      isCurrent: false,
      label: 'EDUCATION',
      role: 'HIGHER SECONDARY CERTIFICATE (HSC)',
      title: 'Shah Makhdum College, Rajshahi',
      desc: 'Science Group under Rajshahi Board with GPA 4.67 (out of 5.00). Focused on Higher Mathematics, Physics, and Chemistry.',
      iconHtml: `<svg class="w-6 h-6 text-[#A855F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
      iconWrapClass: 'border-[#A855F7]/30 bg-[#A855F7]/5',
      skills: null
    },
    {
      startDate: '2016',
      endDate: '2018',
      isCurrent: false,
      label: 'EDUCATION',
      role: 'SECONDARY SCHOOL CERTIFICATE (SSC)',
      title: 'Halima Begum Academy Secondary High School',
      desc: 'Science Group under Jessore Board with GPA 4.94 (out of 5.00). Academic excellence in General Science and Mathematics.',
      iconHtml: `<svg class="w-6 h-6 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>`,
      iconWrapClass: 'border-[#38BDF8]/30 bg-[#38BDF8]/5',
      skills: null
    }
  ];

  return `
    <section id="education" class="py-24 px-4 sm:px-8 relative bg-[#030711] overflow-hidden">
      <!-- Ambient Background Glows -->
      <div class="absolute top-[30%] left-[-10%] w-[40%] h-[40%] bg-[#00D9FF]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div class="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-[#A855F7]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      
      <!-- Subtle Grid -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNjBoNjBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwdjYwaDYwVjBIMHptNTkgNTlIMVYxX2g1OHY1OHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] opacity-50 z-0"></div>

      <div class="max-w-[1100px] mx-auto relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col items-center text-center space-y-4 mb-20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-[#00D9FF]/50"></div>
            <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.25em] uppercase">My Journey</span>
            <div class="w-12 h-px bg-gradient-to-l from-transparent to-[#00D9FF]/50"></div>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            <span class="text-white">Education & </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">Experience</span>
          </h2>
          <p class="text-[#94A3B8] text-[15px] max-w-lg mx-auto font-medium">
            From computer science fundamentals to building modern digital products.
          </p>
        </div>

        <!-- Timeline Container -->
        <div class="relative mt-10">
          <!-- The Vertical Timeline Line -->
          <div class="absolute left-[24px] md:left-[220px] top-4 bottom-4 w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent"></div>

          <div class="space-y-10">
            ${timelineData.map((item) => `
              <div class="flex flex-col md:flex-row relative">
                
                <!-- Left Column (Date & Label) -->
                <div class="md:w-[220px] pl-16 md:pl-0 md:pr-12 flex-shrink-0 pt-4 md:pt-6 text-left md:text-right">
                  <div class="font-bold text-[15px] tracking-tight ${item.isCurrent ? 'text-[#00D9FF]' : 'text-[#7C8B9E]'}">
                    ${item.startDate} <span class="text-white/20 mx-1">—</span> ${item.endDate}
                  </div>
                  <div class="mt-3 px-3 py-1 rounded-full border ${item.isCurrent ? 'border-[#00D9FF]/30 bg-[#00D9FF]/5 text-[#00D9FF]' : 'border-white/10 bg-white/5 text-[#7C8B9E]'} text-[9px] tracking-[0.15em] font-bold w-fit md:ml-auto flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full ${item.isCurrent ? 'bg-[#00D9FF]' : 'bg-[#7C8B9E]'}"></div>
                    ${item.label}
                  </div>
                </div>

                <!-- Center Bullet -->
                <div class="absolute left-[24px] md:left-[220px] top-6 md:top-8 w-[18px] h-[18px] -translate-x-1/2 rounded-full border-[3.5px] ${item.isCurrent ? 'border-[#00D9FF] bg-[#030711] shadow-[0_0_12px_#00D9FF]' : 'border-[#475569] bg-[#030711]'} z-10 transition-transform duration-300 hover:scale-125"></div>

                <!-- Right Column (Card) -->
                <div class="flex-1 pl-16 md:pl-10 mt-6 md:mt-0">
                  <div class="${item.isCurrent ? 'p-[1.5px] bg-gradient-to-r from-[#00D9FF] to-[#A855F7] shadow-[0_10px_30px_rgba(0,217,255,0.15)]' : 'bg-[#060B14] border border-white/10 shadow-lg'} rounded-[20px] group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                    
                    <!-- Inner Container -->
                    <div class="${item.isCurrent ? 'bg-[#050914] rounded-[19px]' : ''} p-6 sm:p-7 flex flex-col lg:flex-row gap-6 items-start relative z-10 h-full w-full">
                      
                      <!-- Card Icon -->
                      <div class="w-[52px] h-[52px] rounded-[14px] border ${item.iconWrapClass} flex items-center justify-center shrink-0">
                        ${item.iconHtml}
                      </div>

                      <!-- Middle Content -->
                      <div class="flex-1">
                        <div class="text-[#7C8B9E] font-bold text-[10px] tracking-[0.2em] uppercase mb-1.5 ${item.isCurrent ? 'text-[#00D9FF]/80' : 'text-[#7C8B9E]'}">${item.role}</div>
                        <h3 class="text-white font-bold text-[22px] tracking-tight mb-3 group-hover:text-white transition-colors">${item.title}</h3>
                        <p class="text-[#7C8B9E] text-[13.5px] leading-[1.65] font-medium lg:max-w-md">
                          ${item.desc}
                        </p>
                      </div>

                      <!-- Optional Right Skills Column (Only for Current Item) -->
                      ${item.skills ? `
                        <div class="lg:w-[220px] flex flex-col lg:border-l border-white/10 lg:pl-7 mt-2 lg:mt-0 shrink-0">
                          <div class="px-3 py-1 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 text-[#00D9FF] text-[9px] font-bold tracking-[0.15em] w-fit mb-4 flex items-center gap-1.5">
                            <div class="w-1 h-1 rounded-full bg-emerald-400"></div>
                            CURRENT
                          </div>
                          <div class="text-[#94A3B8] text-[12px] leading-[2.2] font-medium font-mono">
                            ${item.skills}
                          </div>
                        </div>
                      ` : ''}

                    </div>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer CTA -->
        <div class="mt-20 flex items-center justify-center gap-4">
          <div class="w-10 h-px bg-gradient-to-r from-transparent to-white/20"></div>
          <span class="text-[#7C8B9E] text-[13px] font-medium flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            Building skills today for a better tomorrow. <span class="text-[#00D9FF] font-black ml-1 text-lg leading-none">&rarr;</span>
          </span>
          <div class="w-10 h-px bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

      </div>
    </section>
  `;
}

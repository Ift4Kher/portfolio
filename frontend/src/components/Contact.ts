import { SiteSettingsData, SocialLinkItem } from '../types';
import { api } from '../services/api';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('github')) return `<svg class="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;
  if (p.includes('linkedin')) return `<svg class="w-[18px] h-[18px] text-[#00D9FF]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  if (p.includes('facebook')) return `<svg class="w-[18px] h-[18px] text-[#3b5998]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  if (p.includes('instagram')) return `<svg class="w-[18px] h-[18px] text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`;
  return `<svg class="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>`;
};

export function renderContact(settings: SiteSettingsData, socials: SocialLinkItem[]): string {
  return `
    <section id="contact" class="py-24 px-4 sm:px-8 relative bg-[#030711] overflow-hidden">
      <!-- Ambient Background Glows & Grid -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNjBoNjBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMCAwdjYwaDYwVjBIMHptNTkgNTlIMVYxX2g1OHY1OHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>
      
      <div class="absolute -left-[20%] bottom-0 w-[40%] h-[40%] bg-[#00D9FF]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div class="absolute -right-[10%] top-[20%] w-[30%] h-[30%] bg-[#A855F7]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <!-- Decorative Elements -->
      <div class="absolute left-10 top-32 text-white/10 font-mono text-[10px] leading-[8px] whitespace-pre select-none pointer-events-none hidden xl:block">
+ + + + +
+ + + + +
+ + + + +
      </div>
      <div class="absolute -left-[200px] -bottom-[200px] w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none z-0"></div>
      <div class="absolute -left-[150px] -bottom-[150px] w-[400px] h-[400px] border border-[#00D9FF]/10 rounded-full pointer-events-none z-0"></div>
      <div class="absolute left-[30px] bottom-[250px] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF] pointer-events-none z-0"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col items-center text-center space-y-4 mb-20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-px bg-gradient-to-r from-transparent to-[#00D9FF]/50"></div>
            <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.25em] uppercase">Let's Connect</span>
            <div class="w-12 h-px bg-gradient-to-l from-transparent to-[#00D9FF]/50"></div>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none">
            <span class="text-white">Get In </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">Touch</span>
          </h2>
          <p class="text-[#7C8B9E] text-[15px] max-w-lg mx-auto font-medium leading-relaxed">
            Have a project in mind, a question, or just want to say hi?<br class="hidden sm:block"/>I'd love to hear from you.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Left Info Column -->
          <div class="lg:col-span-5 space-y-10">
            <!-- Let's Build -->
            <div>
              <div class="mb-5">
                <span class="text-[#00D9FF] font-bold text-[11px] tracking-[0.25em] uppercase">Let's Build</span>
              </div>
              <div class="flex gap-5 mb-5">
                <div class="w-1 bg-[#00D9FF] shrink-0 rounded-full"></div>
                <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.1] text-white">
                  Let's build something<br/>meaningful <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#A855F7]">together.</span>
                </h2>
              </div>
              <p class="text-[#7C8B9E] text-[15px] leading-relaxed mb-10 lg:pr-8">
                I'm always excited to work on new projects, discuss ideas, or collaborate on innovative solutions. Whether you have a question, a project proposal, or just want to connect — feel free to reach out.
              </p>
            </div>

            <!-- Contact Rows -->
            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-center gap-5">
                <div class="w-[52px] h-[52px] rounded-2xl bg-[#00D9FF]/5 border border-[#00D9FF]/30 flex items-center justify-center shrink-0">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#00D9FF]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div class="text-[#00D9FF] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">Direct Email</div>
                  <a href="mailto:${settings.contactEmail || 'rifat.dev@example.com'}" class="text-white font-bold text-[15px] hover:text-[#00D9FF] transition-colors">
                    ${settings.contactEmail || 'rifat.dev@example.com'}
                  </a>
                </div>
              </div>

              <!-- Location -->
              ${settings.contactLocation ? `
                <div class="flex items-center gap-5">
                  <div class="w-[52px] h-[52px] rounded-2xl bg-[#A855F7]/5 border border-[#A855F7]/30 flex items-center justify-center shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#A855F7]">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">Location</div>
                    <div class="text-white font-bold text-[15px]">${settings.contactLocation}</div>
                  </div>
                </div>
              ` : ''}

              <!-- Phone -->
              ${settings.contactPhone ? `
                <div class="flex items-center gap-5">
                  <div class="w-[52px] h-[52px] rounded-2xl bg-[#10B981]/5 border border-[#10B981]/30 flex items-center justify-center shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#10B981]">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase mb-1">Phone</div>
                    <div class="text-white font-bold text-[15px]">${settings.contactPhone}</div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Social Links -->
            <div class="border-t border-white/5 pt-8 mt-4">
              <div class="text-[#00D9FF] font-bold text-[10px] tracking-[0.2em] uppercase mb-4">Connect On Social Media</div>
              <div class="flex flex-wrap gap-3">
                ${socials.map(s => `
                  <a href="${s.url}" target="_blank" class="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-[#060B14] hover:bg-white/5 transition-colors group">
                    ${getSocialIcon(s.platform)}
                    <span class="text-[#94A3B8] text-[13px] font-medium group-hover:text-white transition-colors">${s.platform}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Contact Form -->
          <div class="lg:col-span-7 mt-12 lg:mt-0">
            <div class="bg-[#050914] border border-white/10 rounded-[20px] p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative">
              
              <!-- Form Top Label -->
              <div class="flex items-center gap-4 mb-8">
                <div class="w-[42px] h-[34px] rounded-lg bg-[#00D9FF]/5 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] font-bold text-sm tracking-tighter">
                  &lt;&gt;
                </div>
                <span class="text-[#00D9FF] text-[11px] font-bold tracking-[0.15em] uppercase">Send a Message</span>
              </div>

              <div id="contact-alert" class="hidden mb-6 p-4 rounded-xl text-sm font-medium relative z-10"></div>

              <form id="contact-form" class="space-y-5 relative z-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <!-- Name Input -->
                  <div class="space-y-2">
                    <label for="contact-name" class="block text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase ml-1">Your Name *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7C8B9E]">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        id="contact-name" 
                        name="name" 
                        required 
                        placeholder="e.g. John Doe" 
                        class="w-full pl-11 pr-4 py-3.5 bg-[#0A1223] border border-white/5 rounded-[12px] text-white placeholder:text-[#475569] text-[13.5px] focus:outline-none focus:border-[#00D9FF]/50 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <!-- Email Input -->
                  <div class="space-y-2">
                    <label for="contact-email" class="block text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase ml-1">Email Address *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7C8B9E]">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        required 
                        placeholder="e.g. john@example.com" 
                        class="w-full pl-11 pr-4 py-3.5 bg-[#0A1223] border border-white/5 rounded-[12px] text-white placeholder:text-[#475569] text-[13.5px] focus:outline-none focus:border-[#00D9FF]/50 transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <!-- Subject Input -->
                <div class="space-y-2">
                  <label for="contact-subject" class="block text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase ml-1">Subject *</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#7C8B9E]">
                      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      id="contact-subject" 
                      name="subject" 
                      required 
                      placeholder="e.g. Web Development Inquiry / Project Request" 
                      class="w-full pl-11 pr-4 py-3.5 bg-[#0A1223] border border-white/5 rounded-[12px] text-white placeholder:text-[#475569] text-[13.5px] focus:outline-none focus:border-[#00D9FF]/50 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <!-- Message Input -->
                <div class="space-y-2">
                  <label for="contact-message" class="block text-[#7C8B9E] text-[10px] font-bold tracking-[0.1em] uppercase ml-1">Message *</label>
                  <div class="relative">
                    <div class="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-[#7C8B9E]">
                      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-[18px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <textarea 
                      id="contact-message" 
                      name="message" 
                      rows="4" 
                      required 
                      placeholder="Describe your project details or request..." 
                      class="w-full pl-11 pr-4 py-3.5 bg-[#0A1223] border border-white/5 rounded-[12px] text-white placeholder:text-[#475569] text-[13.5px] focus:outline-none focus:border-[#00D9FF]/50 transition-colors shadow-inner resize-none"
                    ></textarea>
                    
                    <!-- Resize handle icon in bottom right (aesthetic only) -->
                    <div class="absolute bottom-3 right-3 pointer-events-none text-white/10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 15v6h-6L21 15z M21 6v6h-12L21 6z M15 21v-6h-6L15 21z M6 21v-12h-12L6 21z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="pt-2">
                  <button 
                    type="submit" 
                    id="contact-submit-btn" 
                    class="w-full py-[18px] rounded-[14px] font-bold text-[14.5px] text-white bg-gradient-to-r from-[#00D9FF] to-[#A855F7] hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all transform flex items-center justify-center gap-2"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 -rotate-45 mb-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span id="contact-btn-text">Send Message</span>
                    <span class="ml-1 text-lg leading-none">&rarr;</span>
                    <svg id="contact-btn-spinner" class="w-5 h-5 animate-spin hidden ml-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}

export function initContactFormEvents() {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const alert = document.getElementById('contact-alert');
  const btn = document.getElementById('contact-submit-btn') as HTMLButtonElement;
  const btnText = document.getElementById('contact-btn-text');
  const spinner = document.getElementById('contact-btn-spinner');

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name') as HTMLInputElement;
      const emailInput = document.getElementById('contact-email') as HTMLInputElement;
      const subjectInput = document.getElementById('contact-subject') as HTMLInputElement;
      const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !subject || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      // Show loading
      btn.disabled = true;
      btnText!.textContent = 'Sending...';
      spinner?.classList.remove('hidden');
      alert?.classList.add('hidden');

      try {
        await api.submitContact({ name, email, subject, message });
        showAlert('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      } catch (err: any) {
        showAlert(err.message || 'Failed to send message. Please try again.', 'error');
      } finally {
        btn.disabled = false;
        btnText!.textContent = 'Send Message';
        spinner?.classList.add('hidden');
      }
    };
  }

  function showAlert(msg: string, type: 'success' | 'error') {
    if (!alert) return;
    alert.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20', 'bg-rose-500/10', 'text-rose-400', 'border-rose-500/20');
    if (type === 'success') {
      alert.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
    } else {
      alert.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
    }
    alert.textContent = msg;
  }
}

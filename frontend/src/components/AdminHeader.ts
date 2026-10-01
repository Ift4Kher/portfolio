import { AdminUser } from '../types';

export function renderAdminHeader(title: string, user: AdminUser | null): string {
  return `
    <header class="py-4 px-6 bg-[#030711]/80 backdrop-blur-md border-b border-[#1A233A] flex items-center justify-between sticky top-0 z-30">
      <!-- Search Bar -->
      <div class="flex items-center">
        <div class="relative hidden sm:block">
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search anything..." class="w-[300px] bg-[#0A1223] border border-[#1A233A] text-slate-200 text-sm rounded-lg pl-9 pr-12 py-2 focus:outline-none focus:border-[#00D9FF]/40 transition-colors placeholder-slate-500 font-mono" />
          <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span class="bg-[#1A233A] text-slate-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700">⌘K</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <a href="#/" target="_blank" class="px-3 py-1.5 rounded-lg border border-[#1A233A] text-xs font-mono text-cyan-400 hover:bg-cyan-400/10 transition-colors hidden sm:flex items-center gap-1.5">
          <span>View Site</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>

        <!-- Notification Bell -->
        <button class="relative p-2 text-slate-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-[#030711]"></span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-[#1A233A]">
          <div class="w-9 h-9 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
            ${user?.name?.split(' ').map(n => n[0]).join('').substring(0,2) || 'AD'}
          </div>
          <div class="flex flex-col hidden sm:flex">
            <span class="text-[13px] font-bold text-white">${user?.name || 'Admin'}</span>
            <span class="text-[11px] text-slate-400 font-mono">${user?.email || 'admin@rifat.dev'}</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

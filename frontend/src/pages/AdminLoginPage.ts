import { api } from '../services/api';

export function renderAdminLoginPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4 bg-[#030711] relative overflow-hidden">
      <!-- Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

      <div class="w-full max-w-md bg-[#0A1223] rounded-3xl p-8 border border-[#1A233A] space-y-8 shadow-2xl relative z-10">
        <!-- Logo Header -->
        <div class="flex flex-col items-center text-center space-y-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-glow-cyan">
            <div class="w-full h-full bg-[#030711] rounded-[15px] flex items-center justify-center font-bold font-mono text-cyan-400 text-xl">
              🔐
            </div>
          </div>
          <h1 class="text-2xl font-extrabold text-white tracking-tight">Admin CMS Portal</h1>
          <p class="text-xs text-slate-400 font-mono">Md Iftakhar Ahmed Rifat Portfolio</p>
        </div>

        <!-- Alert Notification -->
        <div id="login-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

        <!-- Form -->
        <form id="admin-login-form" class="space-y-5">
          <div class="space-y-2">
            <label for="login-email" class="block text-xs font-mono text-slate-300 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              id="login-email" 
              required 
              value="admin@rifat.dev" 
              placeholder="admin@rifat.dev" 
              class="w-full px-4 py-3 rounded-xl bg-[#111C35] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 font-mono transition-all"
            />
          </div>

          <div class="space-y-2">
            <label for="login-password" class="block text-xs font-mono text-slate-300 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              id="login-password" 
              required 
              value="AdminPass123!" 
              placeholder="••••••••" 
              class="w-full px-4 py-3 rounded-xl bg-[#111C35] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 font-mono transition-all"
            />
          </div>

          <button 
            type="submit" 
            id="login-submit-btn" 
            class="w-full py-3.5 rounded-xl font-mono text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            Authenticate Admin
          </button>
        </form>

        <div class="text-center pt-2">
          <a href="#/" class="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors">
            ← Return to Portfolio Website
          </a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('admin-login-form') as HTMLFormElement;
  const alert = document.getElementById('login-alert');
  const btn = document.getElementById('login-submit-btn') as HTMLButtonElement;

  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const email = (document.getElementById('login-email') as HTMLInputElement).value.trim();
      const password = (document.getElementById('login-password') as HTMLInputElement).value;

      btn.disabled = true;
      btn.textContent = 'Authenticating...';

      try {
        await api.login(email, password);
        window.location.hash = '#/admin';
      } catch (err: any) {
        if (alert) {
          alert.classList.remove('hidden', 'bg-emerald-500/20', 'text-emerald-400');
          alert.classList.add('bg-rose-500/20', 'text-rose-400', 'border', 'border-rose-500/40');
          alert.textContent = err.message || 'Invalid login credentials.';
        }
      } finally {
        btn.disabled = false;
        btn.textContent = 'Authenticate Admin';
      }
    };
  }
}

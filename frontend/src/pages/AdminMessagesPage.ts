import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { ContactMessageItem } from '../types';

export async function renderAdminMessagesPage(container: HTMLElement) {
  try {
    const user = await api.getMe();
    const messages = await api.getMessages();

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/messages')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader('Contact Messages Inbox', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A1223] p-6 rounded-2xl border border-[#1A233A]">
              <div>
                <h2 class="text-xl font-bold text-white font-mono">Contact Form Submissions (${messages.length})</h2>
                <p class="text-xs text-slate-400">View inquiries sent through the public contact form.</p>
              </div>
            </div>

            <!-- Message Detail Modal -->
            <div id="message-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-xl bg-[#0A1223] rounded-2xl p-6 border border-[#1A233A] space-y-6 shadow-2xl">
                <div class="flex items-center justify-between border-b border-[#1A233A] pb-3">
                  <h3 id="m-modal-subject" class="text-lg font-bold text-white font-mono">Message Detail</h3>
                  <button id="close-message-modal" class="text-slate-400 hover:text-white">✕</button>
                </div>

                <div class="space-y-4 text-xs font-mono">
                  <div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#111C35] border border-slate-800">
                    <div>
                      <span class="text-slate-500 block">Sender Name:</span>
                      <span id="m-modal-name" class="font-bold text-white text-sm"></span>
                    </div>
                    <div>
                      <span class="text-slate-500 block">Email Address:</span>
                      <a id="m-modal-email" href="" class="font-bold text-cyan-400 text-sm hover:underline"></a>
                    </div>
                    <div>
                      <span class="text-slate-500 block">Sent Date:</span>
                      <span id="m-modal-date" class="text-slate-300"></span>
                    </div>
                    <div>
                      <span class="text-slate-500 block">IP Address:</span>
                      <span id="m-modal-ip" class="text-slate-400"></span>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <span class="text-slate-400 uppercase tracking-wider block">Message Content:</span>
                    <div id="m-modal-body" class="p-4 rounded-xl bg-[#111C35] border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans"></div>
                  </div>
                </div>

                <div class="pt-4 flex justify-between border-t border-[#1A233A]">
                  <button id="m-modal-reply-btn" class="px-5 py-2 rounded-xl bg-cyan-500 text-white text-xs font-mono font-semibold">Reply via Email</button>
                  <button id="close-message-modal-2" class="px-4 py-2 rounded-xl bg-[#111C35] text-slate-300 text-xs font-mono">Close</button>
                </div>
              </div>
            </div>

            <!-- Messages Table -->
            <div class="bg-[#0A1223] rounded-2xl border border-[#1A233A] overflow-hidden">
              ${messages.length === 0 ? `
                <div class="p-12 text-center text-slate-500 font-mono text-xs">
                  No contact messages received yet.
                </div>
              ` : `
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs font-mono">
                    <thead class="bg-[#111C35]/90 text-slate-400 border-b border-slate-800 uppercase">
                      <tr>
                        <th class="p-4">Status</th>
                        <th class="p-4">Sender</th>
                        <th class="p-4">Subject</th>
                        <th class="p-4">Date</th>
                        <th class="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60">
                      ${messages.map(m => `
                        <tr class="hover:bg-[#111C35]/50 ${m.read ? 'opacity-75' : 'bg-cyan-500/5 font-semibold'}">
                          <td class="p-4">
                            <span class="px-2.5 py-1 rounded text-[10px] font-bold ${m.read ? 'bg-slate-800 text-slate-400' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}">
                              ${m.read ? 'Read' : 'Unread'}
                            </span>
                          </td>
                          <td class="p-4">
                            <div class="flex flex-col">
                              <span class="font-bold text-white text-sm">${m.name}</span>
                              <span class="text-[10px] text-slate-400">${m.email}</span>
                            </div>
                          </td>
                          <td class="p-4 text-slate-300 line-clamp-1">${m.subject}</td>
                          <td class="p-4 text-slate-400">${new Date(m.createdAt).toLocaleString()}</td>
                          <td class="p-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                              <button class="view-msg-btn px-3 py-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono" data-json="${encodeURIComponent(JSON.stringify(m))}">View</button>
                              <button class="toggle-read-btn px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-mono" data-id="${m.id}" data-read="${m.read}">${m.read ? 'Mark Unread' : 'Mark Read'}</button>
                              <button class="delete-msg-btn px-3 py-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono" data-id="${m.id}">Delete</button>
                            </div>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    const modal = document.getElementById('message-modal');

    document.querySelectorAll('.view-msg-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const item: ContactMessageItem = JSON.parse(decodeURIComponent(btn.getAttribute('data-json')!));
        (document.getElementById('m-modal-subject')!).textContent = item.subject;
        (document.getElementById('m-modal-name')!).textContent = item.name;
        const emailLink = document.getElementById('m-modal-email') as HTMLAnchorElement;
        emailLink.textContent = item.email;
        emailLink.href = `mailto:${item.email}`;
        (document.getElementById('m-modal-date')!).textContent = new Date(item.createdAt).toLocaleString();
        (document.getElementById('m-modal-ip')!).textContent = item.ipAddress || 'unknown';
        (document.getElementById('m-modal-body')!).textContent = item.message;

        (document.getElementById('m-modal-reply-btn') as HTMLButtonElement).onclick = () => {
          window.location.href = `mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`;
        };

        modal?.classList.remove('hidden');

        if (!item.read) {
          await api.markMessageRead(item.id, true);
        }
      };
    });

    document.getElementById('close-message-modal')!.onclick = () => {
      modal?.classList.add('hidden');
      renderAdminMessagesPage(container);
    };
    document.getElementById('close-message-modal-2')!.onclick = () => {
      modal?.classList.add('hidden');
      renderAdminMessagesPage(container);
    };

    document.querySelectorAll('.toggle-read-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        const currentRead = btn.getAttribute('data-read') === 'true';
        await api.markMessageRead(id, !currentRead);
        renderAdminMessagesPage(container);
      };
    });

    document.querySelectorAll('.delete-msg-btn').forEach(btn => {
      (btn as HTMLElement).onclick = async () => {
        const id = btn.getAttribute('data-id')!;
        if (confirm('Delete this message?')) {
          await api.deleteMessage(id);
          renderAdminMessagesPage(container);
        }
      };
    });
  } catch {
    window.location.hash = '#/admin/login';
  }
}

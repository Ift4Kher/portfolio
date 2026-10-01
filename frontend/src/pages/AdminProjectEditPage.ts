import { api } from '../services/api';
import { renderAdminSidebar, initAdminSidebarEvents } from '../components/AdminSidebar';
import { renderAdminHeader } from '../components/AdminHeader';
import { ProjectItem } from '../types';

export async function renderAdminProjectEditPage(container: HTMLElement, projectId?: string) {
  try {
    const user = await api.getMe();
    let project: Partial<ProjectItem> | null = null;

    if (projectId) {
      project = await api.getAdminProjectById(projectId);
    }

    const isEdit = Boolean(projectId);

    // Form initial values
    const title = project?.title || '';
    const slug = project?.slug || '';
    const shortDesc = project?.shortDescription || '';
    const fullDesc = project?.fullDescription || '';
    const overview = project?.overview || '';
    const problem = project?.problem || '';
    const solution = project?.solution || '';
    const keyFeatures = project?.keyFeatures || '';
    const challenges = project?.challenges || '';
    const results = project?.results || '';
    const coverImage = project?.coverImage || '/images/projects/portfolio-cms.svg';
    const githubUrl = project?.githubUrl || '';
    const liveDemoUrl = project?.liveDemoUrl || '';
    const featured = project?.featured ?? false;
    const published = project?.published ?? true;
    const carouselOrder = project?.carouselOrder ?? 0;
    const accentColor = project?.accentColor || '#06b6d4';
    const categoriesList = project?.categoriesList || ['Full Stack'];
    const technologiesList = project?.technologiesList || ['HTML5', 'Tailwind CSS', 'TypeScript', 'Node.js', 'MySQL'];

    container.innerHTML = `
      <div class="min-h-screen flex bg-[#030711] text-slate-100">
        ${renderAdminSidebar('/admin/projects')}
        <div class="flex-1 flex flex-col min-w-0">
          ${renderAdminHeader(isEdit ? `Edit Project: ${title}` : 'Create New Project', user)}
          
          <main class="p-6 sm:p-8 space-y-6 max-w-5xl w-full mx-auto">
            <!-- Back Button Bar -->
            <div class="flex items-center justify-between">
              <a href="#/admin/projects" class="text-xs font-mono text-cyan-400 hover:underline">
                ← Back to Projects List
              </a>
            </div>

            <!-- Form Card -->
            <div class="bg-[#0A1223] rounded-2xl p-8 border border-[#1A233A] space-y-6">
              <div id="project-form-alert" class="hidden p-4 rounded-xl text-xs font-mono font-medium"></div>

              <form id="project-editor-form" class="space-y-6">
                <!-- Title & Slug -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Project Title *</label>
                    <input type="text" id="p-title" required value="${title}" placeholder="e.g. FarmersBD E-Commerce" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">URL Slug (Auto-generated if empty)</label>
                    <input type="text" id="p-slug" value="${slug}" placeholder="e.g. farmersbd-ecommerce" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                </div>

                <!-- Short & Full Description -->
                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Short Description (Summary) *</label>
                  <textarea id="p-short-desc" required rows="2" placeholder="Brief 1-2 sentence overview..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none">${shortDesc}</textarea>
                </div>

                <div class="space-y-2">
                  <label class="block text-xs font-mono text-slate-300 uppercase">Full Detailed Description *</label>
                  <textarea id="p-full-desc" required rows="4" placeholder="Detailed architectural description..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 resize-y">${fullDesc}</textarea>
                </div>

                <!-- Case Study Sections (Overview, Problem, Solution) -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Overview</label>
                    <textarea id="p-overview" rows="3" placeholder="Context & background..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none">${overview}</textarea>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Problem Statement</label>
                    <textarea id="p-problem" rows="3" placeholder="What challenge did this solve..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none">${problem}</textarea>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Engineering Solution</label>
                    <textarea id="p-solution" rows="3" placeholder="How did your code solve it..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none">${solution}</textarea>
                  </div>
                </div>

                <!-- Key Features & Challenges -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Key Features (One feature per line)</label>
                    <textarea id="p-key-features" rows="4" placeholder="Direct Farmer Marketplace&#10;Order Management&#10;SMS Alerts..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono">${keyFeatures}</textarea>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Challenges & Results</label>
                    <textarea id="p-challenges" rows="2" placeholder="Challenges faced..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono mb-2">${challenges}</textarea>
                    <textarea id="p-results" rows="2" placeholder="Measurable results & impact..." class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono">${results}</textarea>
                  </div>
                </div>

                <!-- Cover Image & Links -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div class="space-y-2 sm:col-span-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Cover Image URL *</label>
                    <div class="flex gap-3">
                      <input type="text" id="p-cover-image" required value="${coverImage}" placeholder="/images/projects/farmersbd.svg" class="flex-1 px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                      <label class="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-400 text-xs font-mono font-semibold cursor-pointer flex items-center justify-center">
                        <span>Upload</span>
                        <input type="file" id="p-upload-file" class="hidden" accept="image/*"/>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Accent Color</label>
                    <input type="color" id="p-accent-color" value="${accentColor}" class="w-full h-11 rounded-xl bg-[#111C35] border border-slate-700 cursor-pointer p-1"/>
                  </div>
                </div>

                <!-- URLs -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">GitHub Repository URL</label>
                    <input type="url" id="p-github-url" value="${githubUrl}" placeholder="https://github.com/rifat/repo" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Live Demo URL</label>
                    <input type="url" id="p-demo-url" value="${liveDemoUrl}" placeholder="https://demo.vercel.app" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                </div>

                <!-- Categories & Tech Stack Input -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Categories (Comma separated)</label>
                    <input type="text" id="p-categories" value="${categoriesList.join(', ')}" placeholder="Full Stack, Frontend, Management System" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-mono text-slate-300 uppercase">Technologies (Comma separated)</label>
                    <input type="text" id="p-technologies" value="${technologiesList.join(', ')}" placeholder="HTML5, Tailwind CSS, TypeScript, Node.js, MySQL" class="w-full px-4 py-2.5 rounded-xl bg-[#111C35] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"/>
                  </div>
                </div>

                <!-- Toggles & Carousel Order -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1A233A]">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="p-featured" ${featured ? 'checked' : ''} class="w-5 h-5 rounded border-slate-700 bg-[#111C35] text-cyan-500 focus:ring-cyan-500"/>
                    <span class="text-xs font-mono text-slate-300 font-semibold">Featured in 3D Carousel</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" id="p-published" ${published ? 'checked' : ''} class="w-5 h-5 rounded border-slate-700 bg-[#111C35] text-cyan-500 focus:ring-cyan-500"/>
                    <span class="text-xs font-mono text-slate-300 font-semibold">Published (Public View)</span>
                  </label>

                  <div class="flex items-center gap-3">
                    <label class="text-xs font-mono text-slate-300">Carousel Order:</label>
                    <input type="number" id="p-carousel-order" value="${carouselOrder}" min="0" class="w-20 px-3 py-1.5 rounded-xl bg-[#111C35] border border-slate-700 text-white font-mono text-xs"/>
                  </div>
                </div>

                <!-- Submit Buttons -->
                <div class="pt-6 flex justify-end gap-4">
                  <a href="#/admin/projects" class="px-6 py-3 rounded-xl bg-[#111C35] border border-slate-800 text-slate-300 hover:text-white text-xs font-mono font-semibold">
                    Cancel
                  </a>
                  <button type="submit" id="save-project-btn" class="px-8 py-3 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-glow-cyan">
                    ${isEdit ? 'Save Project Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    `;

    initAdminSidebarEvents();

    // Image Upload event
    const uploadInput = document.getElementById('p-upload-file') as HTMLInputElement;
    const coverInput = document.getElementById('p-cover-image') as HTMLInputElement;

    if (uploadInput) {
      uploadInput.onchange = async () => {
        if (uploadInput.files && uploadInput.files[0]) {
          try {
            const res = await api.uploadFile(uploadInput.files[0]);
            coverInput.value = res.url;
          } catch (err: any) {
            alert('Upload failed: ' + err.message);
          }
        }
      };
    }

    // Form Submit Event
    const form = document.getElementById('project-editor-form') as HTMLFormElement;
    const alertBox = document.getElementById('project-form-alert');

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();

        const payload = {
          title: (document.getElementById('p-title') as HTMLInputElement).value.trim(),
          slug: (document.getElementById('p-slug') as HTMLInputElement).value.trim(),
          shortDescription: (document.getElementById('p-short-desc') as HTMLTextAreaElement).value.trim(),
          fullDescription: (document.getElementById('p-full-desc') as HTMLTextAreaElement).value.trim(),
          overview: (document.getElementById('p-overview') as HTMLTextAreaElement).value.trim(),
          problem: (document.getElementById('p-problem') as HTMLTextAreaElement).value.trim(),
          solution: (document.getElementById('p-solution') as HTMLTextAreaElement).value.trim(),
          keyFeatures: (document.getElementById('p-key-features') as HTMLTextAreaElement).value.trim(),
          challenges: (document.getElementById('p-challenges') as HTMLTextAreaElement).value.trim(),
          results: (document.getElementById('p-results') as HTMLTextAreaElement).value.trim(),
          coverImage: coverInput.value.trim(),
          accentColor: (document.getElementById('p-accent-color') as HTMLInputElement).value,
          githubUrl: (document.getElementById('p-github-url') as HTMLInputElement).value.trim(),
          liveDemoUrl: (document.getElementById('p-demo-url') as HTMLInputElement).value.trim(),
          categories: (document.getElementById('p-categories') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean),
          technologies: (document.getElementById('p-technologies') as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean),
          featured: (document.getElementById('p-featured') as HTMLInputElement).checked,
          published: (document.getElementById('p-published') as HTMLInputElement).checked,
          carouselOrder: parseInt((document.getElementById('p-carousel-order') as HTMLInputElement).value) || 0
        };

        try {
          if (isEdit && projectId) {
            await api.updateProject(projectId, payload);
          } else {
            await api.createProject(payload);
          }

          window.location.hash = '#/admin/projects';
        } catch (err: any) {
          if (alertBox) {
            alertBox.classList.remove('hidden');
            alertBox.classList.add('bg-rose-500/20', 'text-rose-400', 'border', 'border-rose-500/40');
            alertBox.textContent = err.message || 'Failed to save project.';
          }
        }
      };
    }
  } catch {
    window.location.hash = '#/admin/login';
  }
}

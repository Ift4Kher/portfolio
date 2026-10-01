import './styles.css';
import { renderHomePage } from './pages/HomePage';
import { renderProjectsPage } from './pages/ProjectsPage';
import { renderProjectDetailPage } from './pages/ProjectDetailPage';
import { renderAdminLoginPage } from './pages/AdminLoginPage';
import { renderAdminDashboardPage } from './pages/AdminDashboardPage';
import { renderAdminProjectsPage } from './pages/AdminProjectsPage';
import { renderAdminProjectEditPage } from './pages/AdminProjectEditPage';
import { renderAdminCarouselPage } from './pages/AdminCarouselPage';
import { renderAdminServicesPage } from './pages/AdminServicesPage';
import { renderAdminSkillsPage } from './pages/AdminSkillsPage';
import { renderAdminEducationPage } from './pages/AdminEducationPage';
import { renderAdminProcessPage } from './pages/AdminProcessPage';
import { renderAdminAboutPage } from './pages/AdminAboutPage';
import { renderAdminHeroPage } from './pages/AdminHeroPage';
import { renderAdminMessagesPage } from './pages/AdminMessagesPage';
import { renderAdminSettingsPage } from './pages/AdminSettingsPage';

const app = document.getElementById('app');

async function handleRouting() {
  if (!app) return;

  const hash = window.location.hash || '#/';
  const cleanHash = hash.replace(/^#/, '');

  // Match /projects/:slug
  const projectDetailMatch = cleanHash.match(/^\/projects\/([a-zA-Z0-9_-]+)$/);
  if (projectDetailMatch) {
    const slug = projectDetailMatch[1];
    await renderProjectDetailPage(app, slug);
    return;
  }

  // Match /admin/projects/edit/:id
  const adminEditMatch = cleanHash.match(/^\/admin\/projects\/edit\/([a-zA-Z0-9_-]+)$/);
  if (adminEditMatch) {
    const id = adminEditMatch[1];
    await renderAdminProjectEditPage(app, id);
    return;
  }

  switch (cleanHash) {
    case '/':
    case '/home':
      await renderHomePage(app);
      break;

    case '/about':
    case '/services':
    case '/skills':
    case '/contact': {
      await renderHomePage(app);
      const targetId = cleanHash.replace('/', '');
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      break;
    }

    case '/projects':
      await renderProjectsPage(app);
      break;

    case '/admin/login':
      renderAdminLoginPage(app);
      break;

    case '/admin':
      await renderAdminDashboardPage(app);
      break;

    case '/admin/projects':
      await renderAdminProjectsPage(app);
      break;

    case '/admin/projects/create':
      await renderAdminProjectEditPage(app);
      break;

    case '/admin/carousel':
      await renderAdminCarouselPage(app);
      break;

    case '/admin/services':
      await renderAdminServicesPage(app);
      break;

    case '/admin/skills':
      await renderAdminSkillsPage(app);
      break;

    case '/admin/education':
      await renderAdminEducationPage(app);
      break;

    case '/admin/process':
      await renderAdminProcessPage(app);
      break;

    case '/admin/about':
      await renderAdminAboutPage(app);
      break;

    case '/admin/hero':
      await renderAdminHeroPage(app);
      break;

    case '/admin/messages':
      await renderAdminMessagesPage(app);
      break;

    case '/admin/settings':
      await renderAdminSettingsPage(app);
      break;

    default:
      await renderHomePage(app);
      break;
  }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);

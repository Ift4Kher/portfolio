const fs = require('fs');
const path = require('path');

const projectImages = [
  { name: 'farmersbd.svg', title: 'FarmersBD E-Commerce', color1: '#064e3b', color2: '#10b981' },
  { name: 'ubmis.svg', title: 'UBMIS Board Portal', color1: '#1e1b4b', color2: '#6366f1' },
  { name: 'portfolio-cms.svg', title: 'Developer Portfolio CMS', color1: '#083344', color2: '#06b6d4' },
  { name: 'novastore.svg', title: 'NovaStore E-Commerce', color1: '#0c4a6e', color2: '#38bdf8' },
  { name: 'omnimetrics.svg', title: 'OmniMetrics Dashboard', color1: '#451a03', color2: '#f59e0b' },
  { name: 'apex-landing.svg', title: 'Apex Landing SaaS', color1: '#500724', color2: '#ec4899' },
  { name: 'medicare.svg', title: 'MediCare Health Portal', color1: '#042f2e', color2: '#14b8a6' },
  { name: 'taskpulse.svg', title: 'TaskPulse Kanban SaaS', color1: '#2e1065', color2: '#8b5cf6' },
  { name: 'ecodrive.svg', title: 'EcoDrive Fleet Manager', color1: '#1a2e05', color2: '#84cc16' },
  { name: 'finsmart.svg', title: 'FinSmart Budget Planner', color1: '#164e63', color2: '#06b6d4' },
  { name: 'gallery-sample-1.svg', title: 'System Details View', color1: '#1e293b', color2: '#475569' },
  { name: 'gallery-sample-2.svg', title: 'Mobile Responsive View', color1: '#0f172a', color2: '#334155' }
];

const frontendDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'projects');
const backendDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });
if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir, { recursive: true });

projectImages.forEach(img => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="grad_${img.name.replace(/[^a-z0-9]/gi, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${img.color1}" />
        <stop offset="100%" stop-color="${img.color2}" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="800" height="500" fill="url(#grad_${img.name.replace(/[^a-z0-9]/gi, '_')})" />
    <rect width="800" height="500" fill="url(#grid)" />
    <rect x="50" y="40" width="700" height="420" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <circle cx="80" cy="70" r="6" fill="#ef4444" />
    <circle cx="100" cy="70" r="6" fill="#f59e0b" />
    <circle cx="120" cy="70" r="6" fill="#10b981" />
    <line x1="50" y1="100" x2="750" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    <text x="400" y="230" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">${img.title}</text>
    <text x="400" y="275" font-family="system-ui, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)" text-anchor="middle">Md Iftakhar Ahmed Rifat — Web Developer</text>
    <rect x="300" y="320" width="200" height="44" rx="8" fill="${img.color2}" opacity="0.9" />
    <text x="400" y="348" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#ffffff" text-anchor="middle">Featured Project</text>
  </svg>`;
  
  fs.writeFileSync(path.join(frontendDir, img.name), svgContent);
  fs.writeFileSync(path.join(backendDir, img.name), svgContent);
});
console.log('Project mockup image files generated successfully!');

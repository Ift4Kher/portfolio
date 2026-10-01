import {
  HeroData,
  AboutData,
  ServiceItem,
  SkillItem,
  ProjectItem,
  EducationItem,
  ProcessStepItem,
  SiteSettingsData,
  SocialLinkItem
} from '../types';

export const fallbackHero: HeroData = {
  id: 'default-hero',
  greeting: "Hello, I'm",
  name: 'MD Iftakhar Ahmed Rifat',
  title: 'Full-Stack Web Developer & UI Designer',
  subtitle: 'AI-Assisted Full Stack Web Developer specializing in crafting responsive web applications, secure dashboards, and scalable databases.',
  profileImage: '/images/rifat-hero.png',
  primaryCtaText: 'View Featured Work',
  primaryCtaLink: '#featured-projects',
  secondaryCtaText: 'Download CV',
  secondaryCtaLink: '/cv/rifat-cv.pdf'
};

export const fallbackAbout: AboutData = {
  id: 'default-about',
  title: 'Full-Stack Web Developer & Graphic Designer',
  description: 'I am MD Iftakhar Ahmed Rifat, an AI-Assisted Full Stack Web Developer and UI designer with a passion for building clean, user-friendly, and robust web applications.',
  bio: 'BSc in Computer Science & Engineering graduate from Eastern University with professional Graphic Design certification from UY LAB. Experienced in developing dynamic web applications, administrative dashboards, authentication systems, and relational MySQL databases using modern frontend and backend technologies.',
  yearsExperience: 2,
  completedProjects: 15,
  clientsServed: 10,
  image: '/images/rifat-hero.png'
};

export const fallbackServices: ServiceItem[] = [
  {
    id: 's-1',
    title: 'Web Development',
    description: 'Building responsive, modern, and accessible websites tailored to business goals with optimized code standard.',
    icon: 'code-2',
    displayOrder: 1,
    published: true
  },
  {
    id: 's-2',
    title: 'Frontend Development',
    description: 'Developing pixel-perfect, highly dynamic client applications using HTML5, Tailwind CSS, and modular TypeScript.',
    icon: 'layout',
    displayOrder: 2,
    published: true
  },
  {
    id: 's-3',
    title: 'Full-Stack Development',
    description: 'Architecting end-to-end solutions connecting secure RESTful APIs (Node.js/Express) with relational MySQL databases.',
    icon: 'server',
    displayOrder: 3,
    published: true
  },
  {
    id: 's-4',
    title: 'UI/UX Implementation',
    description: 'Transforming design mockups into smooth, interactive, and responsive web components with micro-animations.',
    icon: 'figma',
    displayOrder: 4,
    published: true
  },
  {
    id: 's-5',
    title: 'Website Optimization',
    description: 'Enhancing page load speeds, SEO meta architecture, Core Web Vitals, and accessibility for maximum conversion.',
    icon: 'zap',
    displayOrder: 5,
    published: true
  },
  {
    id: 's-6',
    title: 'API & Backend Integration',
    description: 'Designing secure authentication, CRUD endpoints, token verification, and automated database migrations.',
    icon: 'shield-check',
    displayOrder: 6,
    published: true
  }
];

export const fallbackSkills: SkillItem[] = [
  { id: 'sk-1', name: 'HTML5', category: 'Frontend', icon: 'html5', proficiency: 95, displayOrder: 1, published: true },
  { id: 'sk-2', name: 'CSS3 / Tailwind', category: 'Frontend', icon: 'css3', proficiency: 92, displayOrder: 2, published: true },
  { id: 'sk-3', name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'javascript', proficiency: 90, displayOrder: 3, published: true },
  { id: 'sk-4', name: 'TypeScript', category: 'Frontend', icon: 'typescript', proficiency: 85, displayOrder: 4, published: true },
  { id: 'sk-5', name: 'Node.js', category: 'Backend', icon: 'nodejs', proficiency: 88, displayOrder: 5, published: true },
  { id: 'sk-6', name: 'Express.js', category: 'Backend', icon: 'express', proficiency: 86, displayOrder: 6, published: true },
  { id: 'sk-7', name: 'PHP', category: 'Backend', icon: 'php', proficiency: 80, displayOrder: 7, published: true },
  { id: 'sk-8', name: 'MySQL', category: 'Database', icon: 'mysql', proficiency: 88, displayOrder: 8, published: true },
  { id: 'sk-9', name: 'Prisma ORM', category: 'Database', icon: 'prisma', proficiency: 85, displayOrder: 9, published: true },
  { id: 'sk-10', name: 'Git & GitHub', category: 'Tools', icon: 'git', proficiency: 90, displayOrder: 10, published: true },
  { id: 'sk-11', name: 'Photoshop / Canva', category: 'Tools', icon: 'figma', proficiency: 88, displayOrder: 11, published: true }
];

export const fallbackProjects: ProjectItem[] = [
  {
    id: 'p-1',
    title: 'FarmersBD — Agricultural E-Commerce Portal',
    slug: 'farmersbd-agricultural-ecommerce',
    shortDescription: 'A comprehensive digital marketplace connecting regional farmers directly with agricultural product buyers, featuring real-time supply listings.',
    fullDescription: 'FarmersBD is an agricultural supply chain management and e-commerce portal built to empower local farmers by providing a direct marketplace. It eliminates unnecessary intermediaries, allowing farmers to showcase crop harvests, set wholesale prices, and process buyer orders directly with transparent tracking.',
    overview: 'Designed for high reliability across low-bandwidth rural networks, FarmersBD features simple product category filtering, localized inventory tracking, order status updates, and a responsive mobile interface.',
    problem: 'Traditional agricultural trading involved multiple middlemen, causing delayed payments, reduced profit margins for farmers, and inflated produce prices for retail buyers.',
    solution: 'Developed an intuitive full-stack web application with instant catalog filtering, direct order inquiries, SMS notification updates, and efficient inventory management.',
    keyFeatures: JSON.stringify([
      'Direct Farmer-to-Buyer Marketplace',
      'Category & Harvest Location Filters',
      'Order Management & Live Status Updates',
      'Responsive Mobile-First UI for Rural Users',
      'Admin Dashboard for Produce Verification'
    ]),
    challenges: 'Optimizing page load speed and asset size for 3G cellular network speeds while maintaining crisp visual quality of produce listing photos.',
    results: 'Improved farmer listing speed by 60% and established direct trade connection for over 500 regional agricultural producers.',
    coverImage: '/images/projects/farmersbd.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 1,
    accentColor: '#10b981',
    categoriesList: ['Full Stack', 'Management System'],
    technologiesList: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
    gallery: [
      { id: 'g-1', projectId: 'p-1', imageUrl: '/images/projects/farmersbd.svg', caption: 'Overview', displayOrder: 1 },
      { id: 'g-2', projectId: 'p-1', imageUrl: '/images/projects/gallery-sample-1.svg', caption: 'Dashboard', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-2',
    title: 'UBMIS — University Board Management System',
    slug: 'ubmis-university-board-management',
    shortDescription: 'Enterprise administration dashboard for institutional board meetings, document archival, and automated agenda distribution.',
    fullDescription: 'UBMIS simplifies university board governance by digitizing meeting creation, resolution tracking, document distribution, and voting records into a centralized secure portal.',
    overview: 'Built to replace cumbersome paper binders, UBMIS enables university trustees and board directors to securely access meeting dockets, review institutional proposals, and log official decisions with audit trail compliance.',
    problem: 'Board meeting materials were distributed via printed packets, causing security risks, high paper costs, and slow dissemination of post-meeting action items.',
    solution: 'Implemented an encrypted board governance web app featuring digital agenda builder, role-restricted document viewer, and automated PDF export.',
    keyFeatures: JSON.stringify([
      'Encrypted Meeting Docket Archival',
      'Role-Based Permission Matrix (Trustee, Dean, Admin)',
      'Resolution Vote Counter & Decision Logger',
      'Automated Email Docket Distribution',
      'Real-Time Action Item Tracker'
    ]),
    challenges: 'Ensuring zero document leak vulnerabilities while implementing fast, dynamic multi-page document previews.',
    results: 'Reduced meeting prep time by 75% and paper overhead to zero across 12 university departments.',
    coverImage: '/images/projects/ubmis.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 2,
    accentColor: '#6366f1',
    categoriesList: ['Full Stack', 'Backend'],
    technologiesList: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'Prisma ORM', 'MySQL'],
    gallery: [
      { id: 'g-3', projectId: 'p-2', imageUrl: '/images/projects/ubmis.svg', caption: 'Overview', displayOrder: 1 },
      { id: 'g-4', projectId: 'p-2', imageUrl: '/images/projects/gallery-sample-2.svg', caption: 'Meeting Agenda View', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-3',
    title: 'Personal Portfolio & Custom CMS Architecture',
    slug: 'personal-portfolio-custom-cms',
    shortDescription: 'Ultra-fast developer portfolio with a custom vanilla 3D CSS transform carousel and REST API-driven CMS admin panel.',
    fullDescription: 'This bespoke portfolio platform showcases technical projects, professional services, and contact channels backed by a secure custom Express/MySQL admin panel.',
    overview: 'Designed without heavy front-end frameworks, the site emphasizes pure browser performance, dynamic 3D card layout mathematics, and seamless content management.',
    problem: 'Generic static website templates lack real-time database management capabilities, requiring manual code editing for minor content updates.',
    solution: 'Engineered a framework-free frontend paired with a modular REST API, JWT authentication, and dynamic drag-and-drop carousel ordering.',
    keyFeatures: JSON.stringify([
      'Custom 3D CSS Transform Interactive Carousel',
      'JWT-Secured Admin CMS Dashboard',
      'Dynamic Project Gallery & Category Filtering',
      'High-Performance Vanilla TypeScript Architecture',
      'Prisma ORM & MySQL Relational Database'
    ]),
    challenges: 'Mathematical synchronization of 3D z-index depth sorting and smooth transition easing without relying on external animation libraries.',
    results: 'Achieved 100/100 Lighthouse performance metrics and instantaneous content re-ordering via admin panel.',
    coverImage: '/images/projects/portfolio-cms.svg',
    githubUrl: 'https://github.com/Ift4Kher/portfolio',
    liveDemoUrl: 'https://github.com/Ift4Kher/portfolio',
    featured: true,
    published: true,
    carouselOrder: 3,
    accentColor: '#00D9FF',
    categoriesList: ['Full Stack', 'Frontend', 'UI/UX'],
    technologiesList: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'Prisma ORM', 'MySQL'],
    gallery: [
      { id: 'g-5', projectId: 'p-3', imageUrl: '/images/projects/portfolio-cms.svg', caption: '3D Carousel View', displayOrder: 1 },
      { id: 'g-6', projectId: 'p-3', imageUrl: '/images/projects/gallery-sample-1.svg', caption: 'Admin Dashboard', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-4',
    title: 'TaskPulse — Real-Time Collaborative Task Board',
    slug: 'taskpulse-collaborative-task-board',
    shortDescription: 'Agile sprint management workspace with kanban workflow columns, team assignment badges, and deadline progression indicators.',
    fullDescription: 'TaskPulse is an agile task management platform engineered to keep distributed software teams synchronized across sprints, backlog priorities, and code review lifecycles.',
    overview: 'Equipped with drag-and-drop workflow status swimlanes, subtask checklists, and activity log tracking for high-velocity development squads.',
    problem: 'Teams experienced communication lag and missed deployment deadlines when tracking project issues across scattered spreadsheet files.',
    solution: 'Constructed an interactive kanban workspace with real-time state synchronization, priority labeling, and burndown chart analytics.',
    keyFeatures: JSON.stringify([
      'Interactive Kanban Board with Drag & Drop',
      'Sprint Burndown & Milestone Progression',
      'Team Member Avatar Assignment & Mentions',
      'Custom Tagging & Priority Matrix',
      'Activity Audit Log & Comment Threads'
    ]),
    challenges: 'Handling concurrent status updates without UI flicker or state desynchronization.',
    results: 'Accelerated sprint delivery cycles by 35% for pilot development teams.',
    coverImage: '/images/projects/taskpulse.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 4,
    accentColor: '#ec4899',
    categoriesList: ['Frontend', 'Full Stack'],
    technologiesList: ['HTML5', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Express.js', 'MySQL'],
    gallery: [
      { id: 'g-7', projectId: 'p-4', imageUrl: '/images/projects/taskpulse.svg', caption: 'Kanban Board', displayOrder: 1 },
      { id: 'g-8', projectId: 'p-4', imageUrl: '/images/projects/gallery-sample-2.svg', caption: 'Sprint Progress', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-5',
    title: 'NovaStore — Modern Headless E-Commerce Client',
    slug: 'novastore-headless-ecommerce',
    shortDescription: 'Ultra-fast storefront interface featuring instant product search, dynamic cart drawer, and multi-currency checkout calculation.',
    fullDescription: 'NovaStore delivers a sleek, lightning-fast digital storefront designed for modern lifestyle retail brands seeking maximum conversion and zero lag.',
    overview: 'Built with modular UI components, instant client-side search autocomplete, responsive image galleries, and structured schema markup for search engines.',
    problem: 'Sluggish monolithic store platforms caused 40% user drop-off on mobile devices due to slow page rendering and bloated scripts.',
    solution: 'Engineered a lightweight, static-first e-commerce interface with instant slide-out cart and seamless product option filtering.',
    keyFeatures: JSON.stringify([
      'Instant Asynchronous Search & Auto-Suggest',
      'Dynamic Slide-Out Shopping Bag Drawer',
      'High-Resolution Product Image Carousel',
      'Variant Selector (Size, Color, Material)',
      'Integrated Currency Conversion Engine'
    ]),
    challenges: 'Designing smooth 60fps layout transitions between category browsing and detailed product view states.',
    results: 'Boosted average mobile page loading score to 98/100 and lowered checkout abandonment.',
    coverImage: '/images/projects/novastore.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 5,
    accentColor: '#f59e0b',
    categoriesList: ['Frontend', 'UI/UX'],
    technologiesList: ['HTML5', 'Tailwind CSS', 'JavaScript', 'REST API'],
    gallery: [
      { id: 'g-9', projectId: 'p-5', imageUrl: '/images/projects/novastore.svg', caption: 'Storefront', displayOrder: 1 },
      { id: 'g-10', projectId: 'p-5', imageUrl: '/images/projects/gallery-sample-1.svg', caption: 'Product Details', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-6',
    title: 'MediCare — Clinic Appointment & Patient Portal',
    slug: 'medicare-clinic-patient-portal',
    shortDescription: 'Healthcare scheduling platform offering doctor availability calendars, automated appointment bookings, and patient medical record history.',
    fullDescription: 'MediCare streamlines healthcare operations by providing clinics with digital scheduling, patient intake management, and doctor timeslot allocation.',
    overview: 'Patients can book specialist consultations, receive digital booking confirmations, and view past medical visit summaries in a secure interface.',
    problem: 'Manual telephone appointments led to double bookings, long waiting room delays, and lost patient records.',
    solution: 'Architected a centralized clinic scheduling system with real-time doctor slot availability and instant booking confirmations.',
    keyFeatures: JSON.stringify([
      'Specialist Doctor Directory & Bio Profiles',
      'Real-Time Timeslot Booking Calendar',
      'Patient Consultation History Tracker',
      'Automated SMS & Email Appointment Reminders',
      'Clinic Staff Receptionist Admin Panel'
    ]),
    challenges: 'Preventing double-booking race conditions during high peak appointment scheduling hours.',
    results: 'Eliminated overbooking errors and reduced clinic desk workload by 60%.',
    coverImage: '/images/projects/medicare.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 6,
    accentColor: '#06b6d4',
    categoriesList: ['Full Stack', 'Management System'],
    technologiesList: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL'],
    gallery: [
      { id: 'g-11', projectId: 'p-6', imageUrl: '/images/projects/medicare.svg', caption: 'Portal Home', displayOrder: 1 },
      { id: 'g-12', projectId: 'p-6', imageUrl: '/images/projects/gallery-sample-2.svg', caption: 'Booking Calendar', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-7',
    title: 'OmniMetrics — Multi-Channel Business Analytics Dashboard',
    slug: 'omnimetrics-business-analytics-dashboard',
    shortDescription: 'Executive metrics dashboard tracking revenue pipelines, customer acquisition cost, conversion funnels, and retention curves.',
    fullDescription: 'OmniMetrics consolidates key performance indicators across marketing, sales, and operations into a sleek, dark-mode visual analytics dashboard.',
    overview: 'Features interactive time-series charts, geographic user distribution maps, cohort retention tables, and customizable KPI alert widgets.',
    problem: 'Business leaders struggled to make timely decisions due to fragmented data spread across disconnected SaaS tools.',
    solution: 'Constructed an aggregated dashboard bringing disparate revenue and user engagement metrics into a unified visualization suite.',
    keyFeatures: JSON.stringify([
      'Interactive Revenue & Growth Velocity Charts',
      'Real-Time User Activity Heatmaps',
      'Cohort Retention & Churn Rate Analysis',
      'Custom KPI Goal Target Tracking',
      'One-Click Automated PDF/CSV Report Generation'
    ]),
    challenges: 'Rendering multi-thousand data point charts smoothly without causing browser UI lag.',
    results: 'Empowered management teams with sub-second data refresh rates and automated weekly reporting.',
    coverImage: '/images/projects/omnimetrics.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 7,
    accentColor: '#8b5cf6',
    categoriesList: ['Frontend', 'Backend', 'UI/UX'],
    technologiesList: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL'],
    gallery: [
      { id: 'g-13', projectId: 'p-7', imageUrl: '/images/projects/omnimetrics.svg', caption: 'Overview Dashboard', displayOrder: 1 },
      { id: 'g-14', projectId: 'p-7', imageUrl: '/images/projects/gallery-sample-1.svg', caption: 'Cohort View', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-8',
    title: 'FinSmart — Personal Finance & Budget Planning App',
    slug: 'finsmart-finance-budget-planner',
    shortDescription: 'Intelligent expense tracking utility with recurring bill reminders, category budget caps, and savings goal milestones.',
    fullDescription: 'FinSmart enables individuals to take control of their finances through automated expense categorization, savings envelopes, and cashflow projections.',
    overview: 'Designed for daily use with rapid transaction logging, interactive spending breakdowns, and smart notifications for upcoming bills.',
    problem: 'Users frequently exceeded monthly budgets due to lack of visibility into daily discretionary spending patterns.',
    solution: 'Developed an intuitive personal finance web app featuring visual category progress bars and predictive cashflow forecast indicators.',
    keyFeatures: JSON.stringify([
      'One-Tap Expense & Income Entry',
      'Visual Category Budget Threshold Bars',
      'Monthly Savings Envelope Tracker',
      'Upcoming Bill & Subscription Alerts',
      'Historical Spending Trend Visualizer'
    ]),
    challenges: 'Designing intuitive financial visualization widgets that remain legible on small mobile screens.',
    results: 'Helped pilot users increase their monthly savings rate by an average of 22%.',
    coverImage: '/images/projects/finsmart.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 8,
    accentColor: '#3b82f6',
    categoriesList: ['Full Stack', 'Frontend'],
    technologiesList: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
    gallery: [
      { id: 'g-15', projectId: 'p-8', imageUrl: '/images/projects/finsmart.svg', caption: 'Budget View', displayOrder: 1 },
      { id: 'g-16', projectId: 'p-8', imageUrl: '/images/projects/gallery-sample-2.svg', caption: 'Expense Log', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-9',
    title: 'Apex SaaS — High-Conversion Product Landing Page',
    slug: 'apex-saas-product-landing-page',
    shortDescription: 'Modern dark-themed promotional web page with interactive pricing tiers, customer testimonial sliders, and feature highlight cards.',
    fullDescription: 'Apex SaaS is an optimized marketing landing page created for B2B cloud software products, built to maximize visitor engagement and free trial signups.',
    overview: 'Featuring glassmorphism visual aesthetics, smooth scroll triggers, interactive FAQ accordions, and integrated lead capture forms.',
    problem: 'Generic marketing templates suffered from high bounce rates and poor conversion due to cluttered layouts and sluggish asset loading.',
    solution: 'Designed a high-impact, narrative-driven landing page with clear CTA hierarchies, vibrant gradient accents, and lightning-fast load times.',
    keyFeatures: JSON.stringify([
      'Interactive Monthly / Annual Pricing Switcher',
      'Animated Feature Showcase Cards with Glow Effects',
      'Customer Testimonial Carousel with Star Ratings',
      'Expandable FAQ Accordion Component',
      'Optimized Lead Capture Form with Validation'
    ]),
    challenges: 'Crafting complex CSS glassmorphism and gradient border effects while maintaining fast render performance.',
    results: 'Achieved a 4.8% conversion rate during A/B testing against standard corporate templates.',
    coverImage: '/images/projects/apex-landing.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 9,
    accentColor: '#f43f5e',
    categoriesList: ['Frontend', 'UI/UX'],
    technologiesList: ['HTML5', 'Tailwind CSS', 'JavaScript', 'TypeScript'],
    gallery: [
      { id: 'g-17', projectId: 'p-9', imageUrl: '/images/projects/apex-landing.svg', caption: 'Landing Hero', displayOrder: 1 },
      { id: 'g-18', projectId: 'p-9', imageUrl: '/images/projects/gallery-sample-1.svg', caption: 'Pricing Matrix', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'p-10',
    title: 'EcoDrive — EV Fleet Logistics & Charging Network Portal',
    slug: 'ecodrive-ev-fleet-logistics',
    shortDescription: 'Fleet tracking platform monitoring real-time electric vehicle telemetry, battery health states, and charging station reservations.',
    fullDescription: 'EcoDrive provides electric commercial fleet operators with real-time route optimization, energy consumption analytics, and smart charging station reservation scheduling.',
    overview: 'Includes interactive vehicle location telemetry, battery discharge rate graphs, preventative maintenance flags, and charging station queue status.',
    problem: 'Fleet managers struggled with range anxiety, unplanned charging downtime, and irregular vehicle servicing schedules.',
    solution: 'Constructed an intelligent EV operations platform that predicts battery depletion along assigned routes and automates charging stop reservations.',
    keyFeatures: JSON.stringify([
      'Live Vehicle Battery & Range Telemetry Map',
      'Intelligent Route Energy Consumption Predictor',
      'Charging Depot Slot Reservation Scheduler',
      'Preventative Maintenance Health Diagnostics',
      'Driver Eco-Score & Energy Efficiency Rankings'
    ]),
    challenges: 'Calculating dynamic range projections factoring in vehicle payload weight, temperature, and elevation contours.',
    results: 'Decreased fleet charging idle time by 42% across 80 commercial electric delivery vans.',
    coverImage: '/images/projects/ecodrive.svg',
    githubUrl: 'https://github.com/Ift4Kher',
    liveDemoUrl: 'https://github.com/Ift4Kher',
    featured: true,
    published: true,
    carouselOrder: 10,
    accentColor: '#14b8a6',
    categoriesList: ['Full Stack', 'Management System', 'UI/UX'],
    technologiesList: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'Prisma ORM', 'MySQL'],
    gallery: [
      { id: 'g-19', projectId: 'p-10', imageUrl: '/images/projects/ecodrive.svg', caption: 'Fleet Telemetry Map', displayOrder: 1 },
      { id: 'g-20', projectId: 'p-10', imageUrl: '/images/projects/gallery-sample-2.svg', caption: 'Charging Scheduler', displayOrder: 2 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const fallbackEducation: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'BSc in Computer Science & Engineering (CSE)',
    institution: 'Eastern University',
    startDate: '2022',
    endDate: '2026',
    description: 'Pursuing Bachelor of Science in Computer Science & Engineering with coursework in Software Engineering, Database Management Systems, Data Structures & Algorithms, Web Technologies, and Computer Networks.',
    displayOrder: 1,
    published: true
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary Certificate (H.S.C)',
    institution: 'Shah Makhdum College, Rajshahi',
    startDate: '2018',
    endDate: '2020',
    description: 'Science Group under Rajshahi Board. Focused on Higher Mathematics, Physics, and Chemistry.',
    displayOrder: 2,
    published: true
  }
];

export const fallbackProcess: ProcessStepItem[] = [
  { id: 'pr-1', stepNumber: '01', title: 'Discover', description: 'Analyzing requirements, understanding user needs, defining scope, and mapping architectural goals.', icon: 'search', displayOrder: 1, published: true },
  { id: 'pr-2', stepNumber: '02', title: 'Plan', description: 'Designing database ER diagrams, API endpoint contracts, component structure, and technical milestones.', icon: 'map', displayOrder: 2, published: true },
  { id: 'pr-3', stepNumber: '03', title: 'Design', description: 'Crafting wireframes, UI design tokens, color hierarchy, and high-fidelity interactive prototypes.', icon: 'pen-tool', displayOrder: 3, published: true },
  { id: 'pr-4', stepNumber: '04', title: 'Develop', description: 'Writing modular, type-safe code using HTML5, Tailwind CSS, TypeScript, Node.js, Express, and Prisma.', icon: 'code', displayOrder: 4, published: true },
  { id: 'pr-5', stepNumber: '05', title: 'Test', description: 'Rigorously verifying API security, edge cases, responsive breakpoints, mobile overflow, and performance.', icon: 'check-circle', displayOrder: 5, published: true },
  { id: 'pr-6', stepNumber: '06', title: 'Deploy', description: 'Configuring Vercel frontend deployments, production Node servers, environment security, and SSL.', icon: 'rocket', displayOrder: 6, published: true }
];

export const fallbackSettings: SiteSettingsData = {
  id: 'default-settings',
  siteTitle: 'MD Iftakhar Ahmed Rifat — Web Developer Portfolio',
  metaDescription: 'Professional portfolio and project showcase of MD Iftakhar Ahmed Rifat, AI-Assisted Full-Stack Web Developer & UI Designer.',
  contactEmail: 'iftakherahmed73214@gmail.com',
  contactPhone: '+880 1815273746',
  contactLocation: 'Mirpur 10, Dhaka, Bangladesh',
  cvUrl: '/cv/rifat-cv.pdf',
  footerText: '© 2026 MD Iftakhar Ahmed Rifat. All rights reserved.'
};

export const fallbackSocials: SocialLinkItem[] = [
  { id: 'soc-1', platform: 'GitHub', url: 'https://github.com/Ift4Kher', icon: 'github', displayOrder: 1, published: true },
  { id: 'soc-2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/iftakher-ahmed-3b24a8244?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: 'linkedin', displayOrder: 2, published: true },
  { id: 'soc-3', platform: 'Facebook', url: 'https://www.facebook.com/share/1DoRYQqLbw/', icon: 'facebook', displayOrder: 3, published: true }
];

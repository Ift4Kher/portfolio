import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Initial Admin User
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@rifat.dev';
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'AdminPass123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: 'Md Iftakhar Ahmed Rifat'
    },
    create: {
      email: adminEmail,
      name: 'Md Iftakhar Ahmed Rifat',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log(`👤 Admin user created: ${admin.email}`);

  // 2. Hero Section
  const existingHero = await prisma.hero.findFirst();
  if (!existingHero) {
    await prisma.hero.create({
      data: {
        greeting: "Hello, I'm",
        name: "MD Iftakhar Ahmed Rifat",
        title: "Full-Stack Web Developer & UI Designer",
        subtitle: "AI-Assisted Full Stack Web Developer specializing in crafting responsive web applications, secure dashboards, and scalable databases.",
        profileImage: "/images/rifat-hero.png",
        primaryCtaText: "View Featured Work",
        primaryCtaLink: "#featured-projects",
        secondaryCtaText: "Download CV",
        secondaryCtaLink: "/cv/rifat-cv.pdf"
      }
    });
    console.log('🚀 Hero content seeded');
  }

  // 3. About Section
  const existingAbout = await prisma.about.findFirst();
  if (!existingAbout) {
    await prisma.about.create({
      data: {
        title: "Full-Stack Web Developer & Graphic Designer",
        description: "I am MD Iftakhar Ahmed Rifat, an AI-Assisted Full Stack Web Developer and UI designer with a passion for building clean, user-friendly, and robust web applications.",
        bio: "BSc in Computer Science & Engineering graduate from Eastern University with professional Graphic Design certification from UY LAB. Experienced in developing dynamic web applications, administrative dashboards, authentication systems, and relational MySQL databases using modern frontend and backend technologies.",
        yearsExperience: 2,
        completedProjects: 15,
        clientsServed: 10,
        image: "/images/rifat-hero.png"
      }
    });
    console.log('ℹ️ About section seeded');
  }

  // 4. Services
  const servicesData = [
    {
      title: "Web Development",
      description: "Building responsive, modern, and accessible websites tailored to business goals with optimized code standard.",
      icon: "code-2",
      displayOrder: 1,
      published: true
    },
    {
      title: "Frontend Development",
      description: "Developing pixel-perfect, highly dynamic client applications using HTML5, Tailwind CSS, and modular TypeScript.",
      icon: "layout",
      displayOrder: 2,
      published: true
    },
    {
      title: "Full-Stack Development",
      description: "Architecting end-to-end solutions connecting secure RESTful APIs (Node.js/Express) with relational MySQL databases.",
      icon: "server",
      displayOrder: 3,
      published: true
    },
    {
      title: "UI/UX Implementation",
      description: "Transforming design mockups into smooth, interactive, and responsive web components with micro-animations.",
      icon: "figma",
      displayOrder: 4,
      published: true
    },
    {
      title: "Website Optimization",
      description: "Enhancing page load speeds, SEO meta architecture, Core Web Vitals, and accessibility for maximum conversion.",
      icon: "zap",
      displayOrder: 5,
      published: true
    },
    {
      title: "Custom Web Applications",
      description: "Developing customized management systems, inventory portals, and SaaS dashboards with role-based access control.",
      icon: "cpu",
      displayOrder: 6,
      published: true
    }
  ];

  for (const s of servicesData) {
    const existing = await prisma.service.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.service.create({ data: s });
    }
  }
  console.log('🛠️ Services seeded');

  // 5. Skills
  const skillsData = [
    // Frontend
    { name: "HTML5", category: "Frontend", icon: "html", proficiency: 95, displayOrder: 1 },
    { name: "CSS3", category: "Frontend", icon: "css", proficiency: 92, displayOrder: 2 },
    { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", proficiency: 95, displayOrder: 3 },
    { name: "JavaScript (ES6+)", category: "Frontend", icon: "javascript", proficiency: 90, displayOrder: 4 },
    { name: "TypeScript", category: "Frontend", icon: "typescript", proficiency: 88, displayOrder: 5 },
    
    // Backend
    { name: "Node.js", category: "Backend", icon: "nodejs", proficiency: 88, displayOrder: 6 },
    { name: "Express.js", category: "Backend", icon: "express", proficiency: 90, displayOrder: 7 },
    { name: "REST API Design", category: "Backend", icon: "api", proficiency: 92, displayOrder: 8 },

    // Database
    { name: "MySQL", category: "Database", icon: "mysql", proficiency: 85, displayOrder: 9 },
    { name: "Prisma ORM", category: "Database", icon: "prisma", proficiency: 88, displayOrder: 10 },
    
    // Tools & Version Control
    { name: "Git & GitHub", category: "Tools", icon: "git", proficiency: 90, displayOrder: 11 },
    { name: "VS Code", category: "Tools", icon: "vscode", proficiency: 95, displayOrder: 12 },
    { name: "Postman", category: "Tools", icon: "postman", proficiency: 88, displayOrder: 13 },
    { name: "Vercel / Hosting", category: "Tools", icon: "cloud", proficiency: 85, displayOrder: 14 }
  ];

  for (const sk of skillsData) {
    const existing = await prisma.skill.findFirst({ where: { name: sk.name } });
    if (!existing) {
      await prisma.skill.create({ data: { ...sk, published: true } });
    }
  }
  console.log('⚡ Skills seeded');

  // 6. Categories
  const categoriesData = [
    { name: "Full Stack", slug: "full-stack" },
    { name: "Frontend", slug: "frontend" },
    { name: "Backend", slug: "backend" },
    { name: "UI/UX", slug: "ui-ux" },
    { name: "Management System", slug: "management-system" }
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat
    });
    createdCategories[cat.name] = c.id;
  }
  console.log('📂 Categories seeded');

  // 7. Technologies
  const techData = [
    { name: "HTML5", icon: "code" },
    { name: "CSS3", icon: "palette" },
    { name: "Tailwind CSS", icon: "wind" },
    { name: "JavaScript", icon: "file-code" },
    { name: "TypeScript", icon: "file-type" },
    { name: "Node.js", icon: "server" },
    { name: "Express.js", icon: "terminal" },
    { name: "MySQL", icon: "database" },
    { name: "Prisma ORM", icon: "layers" },
    { name: "REST API", icon: "globe" }
  ];

  const createdTechs: Record<string, string> = {};
  for (const t of techData) {
    const tech = await prisma.technology.upsert({
      where: { name: t.name },
      update: { icon: t.icon },
      create: t
    });
    createdTechs[t.name] = tech.id;
  }
  console.log('🔧 Technologies seeded');

  // 8. Projects (10 Featured Projects for 3D Carousel + Gallery)
  const projectsSeed = [
    {
      title: "FarmersBD — Agricultural E-Commerce Portal",
      slug: "farmersbd-agricultural-ecommerce",
      shortDescription: "A comprehensive digital marketplace connecting regional farmers directly with agricultural product buyers, featuring real-time supply listings.",
      fullDescription: "FarmersBD is an agricultural supply chain management and e-commerce portal built to empower local farmers by providing a direct marketplace. It eliminates unnecessary intermediaries, allowing farmers to showcase crop harvests, set wholesale prices, and process buyer orders directly with transparent tracking.",
      overview: "Designed for high reliability across low-bandwidth rural networks, FarmersBD features simple product category filtering, localized inventory tracking, order status updates, and a responsive mobile interface.",
      problem: "Traditional agricultural trading involved multiple middlemen, causing delayed payments, reduced profit margins for farmers, and inflated produce prices for retail buyers.",
      solution: "Developed an intuitive full-stack web application with instant catalog filtering, direct order inquiries, SMS notification updates, and efficient inventory management.",
      keyFeatures: JSON.stringify([
        "Direct Farmer-to-Buyer Marketplace",
        "Category & Harvest Location Filters",
        "Order Management & Live Status Updates",
        "Responsive Mobile-First UI for Rural Users",
        "Admin Dashboard for Produce Verification"
      ]),
      challenges: "Optimizing page load speed and asset size for 3G cellular network speeds while maintaining crisp visual quality of produce listing photos.",
      results: "Improved farmer listing speed by 60% and established direct trade connection for over 500 regional agricultural producers.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/farmersbd",
      liveDemoUrl: "https://farmersbd-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 1,
      accentColor: "#10b981",
      cats: ["Full Stack", "Management System"],
      techs: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MySQL"]
    },
    {
      title: "UBMIS — University Board Management System",
      slug: "ubmis-university-board-management",
      shortDescription: "Enterprise administration dashboard for institutional board meetings, document archival, and automated agenda distribution.",
      fullDescription: "UBMIS simplifies university board governance by digitizing meeting creation, resolution tracking, document distribution, and voting records into a centralized secure portal.",
      overview: "Built to replace cumbersome paper binders, UBMIS enables university trustees and board directors to securely access meeting dockets, review institutional proposals, and log official decisions with audit trail compliance.",
      problem: "Board meeting materials were distributed via printed packets, causing security risks, high paper costs, and slow dissemination of post-meeting action items.",
      solution: "Implemented an encrypted board governance web app featuring digital agenda builder, role-restricted document viewer, and automated PDF export.",
      keyFeatures: JSON.stringify([
        "Encrypted Meeting Docket Archival",
        "Role-Based Permission Matrix (Trustee, Dean, Admin)",
        "Resolution Vote Counter & Decision Logger",
        "Automated Email Docket Distribution",
        "Real-Time Action Item Tracker"
      ]),
      challenges: "Ensuring zero document leak vulnerabilities while implementing fast, dynamic multi-page document previews.",
      results: "Reduced meeting prep time by 75% and paper overhead to zero across 12 university departments.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/ubmis",
      liveDemoUrl: "https://ubmis-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 2,
      accentColor: "#6366f1",
      cats: ["Full Stack", "Backend"],
      techs: ["TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Prisma ORM", "MySQL"]
    },
    {
      title: "Personal Portfolio & Custom CMS Architecture",
      slug: "personal-portfolio-custom-cms",
      shortDescription: "Ultra-fast developer portfolio with a custom vanilla 3D CSS transform carousel and REST API-driven CMS admin panel.",
      fullDescription: "This bespoke portfolio platform showcases technical projects, professional services, and contact channels backed by a secure custom Express/MySQL admin panel.",
      overview: "Designed without heavy front-end frameworks, the site emphasizes pure browser performance, dynamic 3D card layout mathematics, and seamless content management.",
      problem: "Generic static website templates lack real-time database management capabilities, requiring manual code editing for minor content updates.",
      solution: "Engineered a framework-free frontend paired with a modular REST API, JWT authentication, and dynamic drag-and-drop carousel ordering.",
      keyFeatures: JSON.stringify([
        "Custom 3D Perspective Project Carousel",
        "Secure Admin Dashboard with JWT & HttpOnly Cookies",
        "Drag-and-Drop Featured Project Reordering",
        "Database-Driven Services, Skills & Education Timeline",
        "Real-Time Contact Message Inbox Management"
      ]),
      challenges: "Creating smooth, responsive 3D card transitions across all device viewports using pure CSS transforms and clean event listeners.",
      results: "Achieved 100/100 Lighthouse performance rating and sub-100ms API response times.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/portfolio-cms",
      liveDemoUrl: "https://rifat-portfolio.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 3,
      accentColor: "#06b6d4",
      cats: ["Full Stack", "Frontend", "UI/UX"],
      techs: ["HTML5", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "MySQL", "Prisma ORM"]
    },
    {
      title: "NovaStore — Modern Tech E-Commerce Engine",
      slug: "novastore-tech-ecommerce-engine",
      shortDescription: "High-conversion digital storefront featuring multi-currency support, instant product search, and streamlined guest checkout.",
      fullDescription: "NovaStore is an online retail platform tailored for electronics and computer hardware retailers, engineered for high product catalog throughput and fast checkout UX.",
      overview: "Combines elegant dark-mode product cards with instant client-side search filtering, cart state persistence, and real-time inventory verification.",
      problem: "Existing e-commerce templates suffered from slow page loads during peak promotion events and confusing multi-step checkout flows.",
      solution: "Built a lightweight frontend with debounced API search, single-page slideout cart drawer, and optimized relational MySQL catalog queries.",
      keyFeatures: JSON.stringify([
        "Debounced Real-Time Product Filtering",
        "Persistent Local Storage Cart State",
        "Order Summary Calculator with Coupon Logic",
        "Admin Inventory Manager with Stock Alerts",
        "Clean Dark/Light Theme Palette"
      ]),
      challenges: "Preventing race conditions when multiple users attempt to purchase limited-stock flash items simultaneously.",
      results: "Increased checkout completion rate by 22% during pilot merchant launch.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/novastore",
      liveDemoUrl: "https://novastore-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 4,
      accentColor: "#38bdf8",
      cats: ["Full Stack", "Frontend"],
      techs: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MySQL"]
    },
    {
      title: "OmniMetrics — Analytics & Performance Dashboard",
      slug: "omnimetrics-analytics-dashboard",
      shortDescription: "Real-time SaaS analytics workspace featuring interactive metric widgets, server monitoring graphs, and exportable CSV reports.",
      fullDescription: "OmniMetrics provides cloud infrastructure teams with a clean, dark-themed command center for monitoring web server uptime, throughput spikes, and active API keys.",
      overview: "Focused on clean typography and data clarity, OmniMetrics renders system telemetry without layout clutter.",
      problem: "DevOps engineers struggled with fragmented metrics scattered across multiple third-party monitoring provider tabs.",
      solution: "Created a unified dashboard consolidating server CPU loads, database latency metrics, and API error logs into unified visual panels.",
      keyFeatures: JSON.stringify([
        "Interactive Metric Visualization Cards",
        "Live API Endpoint Health Checker",
        "Filterable System Error Log Viewer",
        "Automated PDF/CSV Performance Report Exporter",
        "Collapsible Responsive Navigation Sidebar"
      ]),
      challenges: "Rendering rapid metric updates smoothly without causing browser UI thread lag.",
      results: "Reduced team incident identification time by 40%.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/omnimetrics",
      liveDemoUrl: "https://omnimetrics-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 5,
      accentColor: "#f59e0b",
      cats: ["Full Stack", "UI/UX"],
      techs: ["TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MySQL"]
    },
    {
      title: "Apex Landing — High-Converting SaaS Landing Page",
      slug: "apex-landing-saas-showcase",
      shortDescription: "Ultra-responsive product showcase page designed for conversion with smooth scroll triggers and interactive pricing toggles.",
      fullDescription: "Apex Landing delivers a stunning modern web presentation for modern cloud software tools, complete with feature tabs, client logos, and dynamic pricing calculators.",
      overview: "Built using clean semantic HTML and Tailwind CSS utilities to ensure 60fps scrolling animations and instant initial visual load.",
      problem: "Standard SaaS templates suffered from bulky JavaScript bundles, delaying time-to-interactive on mobile devices.",
      solution: "Hand-crafted lightweight interactive UI modules for monthly/annual pricing toggles, accordion FAQs, and video preview modals.",
      keyFeatures: JSON.stringify([
        "Annual vs Monthly Dynamic Pricing Toggle",
        "Smooth Scroll Navigation with Section Highlighting",
        "Interactive Accordion FAQ Component",
        "SEO-Optimized Meta Tags & OpenGraph Cards",
        "Mobile App Drawer Menu with Backdrop Blur"
      ]),
      challenges: "Achieving a perfect 100 Mobile PageSpeed score across Google Core Web Vitals audit tools.",
      results: "Delivered sub-0.8s Largest Contentful Paint (LCP) and 35% higher signup conversions.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/apex-landing",
      liveDemoUrl: "https://apex-landing.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 6,
      accentColor: "#ec4899",
      cats: ["Frontend", "UI/UX"],
      techs: ["HTML5", "Tailwind CSS", "JavaScript"]
    },
    {
      title: "MediCare — Clinic Appointment Management Portal",
      slug: "medicare-clinic-appointment-portal",
      shortDescription: "Healthcare portal allowing patients to schedule doctor appointments, view prescription history, and manage medical visits.",
      fullDescription: "MediCare bridges patients and healthcare providers through an easy-to-use appointment booking flow, doctor availability calendar, and automated reminder alerts.",
      overview: "Features multi-doctor slot booking, appointment status tracking, and patient consultation history lookup.",
      problem: "Clinic receptionists managed appointments via manual logbooks, leading to double bookings and lost appointment slots.",
      solution: "Engineered an automated reservation portal with real-time slot lock mechanisms and doctor schedule management.",
      keyFeatures: JSON.stringify([
        "Interactive Doctor Availability Calendar",
        "Patient Self-Service Booking Flow",
        "Doctor Daily Visit Schedule View",
        "SMS/Email Appointment Confirmation Alerts",
        "Digital Prescription Record Archive"
      ]),
      challenges: "Handling time-zone adjustments and slot collisions when multiple patients attempt to book the exact same 15-minute slot.",
      results: "Eliminated double bookings completely and increased patient appointment attendance by 28%.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/medicare-portal",
      liveDemoUrl: "https://medicare-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 7,
      accentColor: "#14b8a6",
      cats: ["Full Stack", "Management System"],
      techs: ["TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "Prisma ORM"]
    },
    {
      title: "TaskPulse — Team Project & Work Tracking SaaS",
      slug: "taskpulse-team-project-tracker",
      shortDescription: "Kanban board and task tracker engineered for agile web development teams to manage sprints and deliverables.",
      fullDescription: "TaskPulse gives software teams a intuitive workspace for organizing backlogs, dragging tasks between sprint columns, and monitoring project deadlines.",
      overview: "Provides clean visual status cards (To Do, In Progress, Code Review, Done) with priority tags and assignee avatars.",
      problem: "Overly complex enterprise project tools frustrated small dev teams with bloated configuration panels.",
      solution: "Developed a stream-lined Kanban board with drag-and-drop column transfers and quick task creation shortcuts.",
      keyFeatures: JSON.stringify([
        "Drag-and-Drop Task Column Management",
        "Sprint Deadline Counter & Priority Indicators",
        "Member Task Assignee Badges",
        "Search & Tag Filtering Bar",
        "Activity Audit Log Feed"
      ]),
      challenges: "Maintaining column drag state synchronization cleanly across multi-user REST API updates.",
      results: "Adopted by 5 local software teams to manage daily agile standups.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/taskpulse",
      liveDemoUrl: "https://taskpulse-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 8,
      accentColor: "#8b5cf6",
      cats: ["Full Stack", "Frontend"],
      techs: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MySQL"]
    },
    {
      title: "EcoDrive — Logistics & Fleet Logistics Tracker",
      slug: "ecodrive-fleet-logistics-tracker",
      shortDescription: "Vehicle fleet tracking console monitoring delivery routes, fuel logs, maintenance schedules, and driver assignments.",
      fullDescription: "EcoDrive provides logistics companies with real-time operational insights into vehicle locations, fuel consumption metrics, and driver performance stats.",
      overview: "Designed with data-dense tables, filterable status pills, and interactive trip route detail modals.",
      problem: "Logistics managers lacked real-time visibility into vehicle routine maintenance schedules, resulting in unexpected fleet breakdowns.",
      solution: "Built a centralized web portal with automated maintenance alerts and driver dispatch history.",
      keyFeatures: JSON.stringify([
        "Fleet Status Summary Metrics (Active, Maintenance, Idle)",
        "Driver Assignment & Contact Log",
        "Fuel Consumption & Maintenance Expense Tracker",
        "Interactive Route Milestone Inspector",
        "Exportable Monthly Logistics PDF Reports"
      ]),
      challenges: "Designing responsive data tables that remain comfortably readable on tablet and mobile viewports.",
      results: "Lowered fleet maintenance delay times by 35% in commercial trial runs.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/ecodrive",
      liveDemoUrl: "https://ecodrive-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 9,
      accentColor: "#84cc16",
      cats: ["Full Stack", "Backend"],
      techs: ["TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MySQL"]
    },
    {
      title: "FinSmart — Personal Finance & Budget Planner",
      slug: "finsmart-personal-finance-planner",
      shortDescription: "Intuitive money management web app featuring expense categorization, monthly savings targets, and visual financial charts.",
      fullDescription: "FinSmart helps individuals take control of their finances by tracking income streams, recurring subscriptions, and custom savings goals in a privacy-focused environment.",
      overview: "Combines quick transaction entries with visual progress rings and monthly spending breakdowns.",
      problem: "Personal finance tools often sell user financial data or suffer from cluttered ad banners.",
      solution: "Created a clean, private, ad-free budget tracking web app with encrypted user data storage.",
      keyFeatures: JSON.stringify([
        "Expense Category Breakdown Charts",
        "Monthly Savings Target Progress Indicators",
        "Recurring Subscription Reminder List",
        "CSV Transaction Import & Export",
        "Dark Mode Financial Dashboard Layout"
      ]),
      challenges: "Calculating cumulative monthly balances accurately across custom user currency formats.",
      results: "Helped early users double their average monthly savings discipline over 3 months.",
      coverImage: "/images/projects/.svg",
      githubUrl: "https://github.com/rifat/finsmart",
      liveDemoUrl: "https://finsmart-demo.vercel.app",
      featured: true,
      published: true,
      carouselOrder: 10,
      accentColor: "#06b6d4",
      cats: ["Frontend", "UI/UX"],
      techs: ["HTML5", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "MySQL"]
    }
  ];

  for (const proj of projectsSeed) {
    const existing = await prisma.project.findUnique({ where: { slug: proj.slug } });
    if (!existing) {
      const p = await prisma.project.create({
        data: {
          title: proj.title,
          slug: proj.slug,
          shortDescription: proj.shortDescription,
          fullDescription: proj.fullDescription,
          overview: proj.overview,
          problem: proj.problem,
          solution: proj.solution,
          keyFeatures: proj.keyFeatures,
          challenges: proj.challenges,
          results: proj.results,
          coverImage: proj.coverImage,
          githubUrl: proj.githubUrl,
          liveDemoUrl: proj.liveDemoUrl,
          featured: proj.featured,
          published: proj.published,
          carouselOrder: proj.carouselOrder,
          accentColor: proj.accentColor,
          gallery: {
            create: [
              { imageUrl: proj.coverImage, caption: "Main Dashboard View", displayOrder: 1 },
              { imageUrl: "/images/projects/.svg", caption: "Detailed Features Interface", displayOrder: 2 },
              { imageUrl: "/images/projects/.svg", caption: "Mobile Responsive View", displayOrder: 3 }
            ]
          }
        }
      });

      // Connect categories
      for (const catName of proj.cats) {
        if (createdCategories[catName]) {
          await prisma.projectCategory.create({
            data: {
              projectId: p.id,
              categoryId: createdCategories[catName]
            }
          });
        }
      }

      // Connect technologies
      for (const tName of proj.techs) {
        if (createdTechs[tName]) {
          await prisma.projectTechnology.create({
            data: {
              projectId: p.id,
              technologyId: createdTechs[tName]
            }
          });
        }
      }
    }
  }
  console.log('🖼️ 10 Sample Projects & Galleries seeded');

  // 9. Education
  const existingEdu = await prisma.education.findFirst();
  if (!existingEdu) {
    await prisma.education.createMany({
      data: [
        {
          degree: "BSc in Computer Science & Engineering (CSE)",
          institution: "Eastern University",
          result: "CGPA: 2.72",
          startDate: "2022",
          endDate: "2026",
          description: "Pursuing Bachelor of Science in CSE with coursework in Software Engineering, Database Management Systems, Data Structures & Algorithms, Web Technologies, and Computer Networks.",
          displayOrder: 1,
          published: true
        },
        {
          degree: "Higher Secondary Certificate (H.S.C)",
          institution: "Shah Makhdum College, Rajshahi",
          result: "GPA: 4.67 (Out of 5.00)",
          startDate: "2018",
          endDate: "2020",
          description: "Science Group, Rajshahi Board. Focused on Higher Mathematics, Physics, and Chemistry.",
          displayOrder: 2,
          published: true
        }
      ]
    });
    console.log('🎓 Education seeded');
  }

  // 10. Development Process
  const existingProcess = await prisma.processStep.findFirst();
  if (!existingProcess) {
    await prisma.processStep.createMany({
      data: [
        { stepNumber: "01", title: "Discover", description: "Analyzing requirements, understanding user needs, defining scope, and mapping architectural goals.", icon: "search", displayOrder: 1 },
        { stepNumber: "02", title: "Plan", description: "Designing database ER diagrams, API endpoint contracts, component structure, and technical milestones.", icon: "map", displayOrder: 2 },
        { stepNumber: "03", title: "Design", description: "Crafting wireframes, UI design tokens, color hierarchy, and high-fidelity interactive prototypes.", icon: "pen-tool", displayOrder: 3 },
        { stepNumber: "04", title: "Develop", description: "Writing modular, type-safe code using HTML5, Tailwind CSS, TypeScript, Node.js, Express, and Prisma.", icon: "code", displayOrder: 4 },
        { stepNumber: "05", title: "Test", description: "Rigorously verifying API security, edge cases, responsive breakpoints, mobile overflow, and performance.", icon: "check-circle", displayOrder: 5 },
        { stepNumber: "06", title: "Deploy", description: "Configuring Vercel frontend deployments, production Node servers, environment security, and SSL.", icon: "rocket", displayOrder: 6 }
      ]
    });
    console.log('🔄 Process steps seeded');
  }

  // 11. Social Links
  const existingSocials = await prisma.socialLink.findFirst();
  if (!existingSocials) {
    await prisma.socialLink.createMany({
      data: [
        { platform: "GitHub", url: "https://github.com/Ift4Kher", icon: "github", displayOrder: 1, published: true },
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/iftakher-ahmed-3b24a8244?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: "linkedin", displayOrder: 2, published: true },
        { platform: "Facebook", url: "https://www.facebook.com/share/1DoRYQqLbw/", icon: "facebook", displayOrder: 3, published: true },
        { platform: "Instagram", url: "https://instagram.com/rifat.dev", icon: "instagram", displayOrder: 4, published: true }
      ]
    });
    console.log('🌐 Social links seeded');
  }

  // 12. Site Settings
  const existingSetting = await prisma.siteSetting.findFirst();
  if (!existingSetting) {
    await prisma.siteSetting.create({
      data: {
        siteTitle: "MD Iftakhar Ahmed Rifat — Web Developer Portfolio",
        metaDescription: "Professional portfolio and project showcase of MD Iftakhar Ahmed Rifat, AI-Assisted Full-Stack Web Developer & UI Designer.",
        contactEmail: "iftakherahmed73214@gmail.com",
        contactPhone: "+880 1815273746",
        contactLocation: "Mirpur 10, Dhaka, Bangladesh",
        cvUrl: "/cv/rifat-cv.pdf",
        footerText: "© 2026 MD Iftakhar Ahmed Rifat. All rights reserved."
      }
    });
    console.log('⚙️ Site settings seeded');
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

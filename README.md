# Full-Stack Portfolio & CMS

A modern, high-performance Full-Stack Developer Portfolio with an integrated headless Content Management System (CMS), interactive 3D Project Carousel, and REST API backend.

## 🚀 Tech Stack

### Frontend
- **Framework:** TypeScript + Vite
- **Styling:** Tailwind CSS (Custom Dark Neon Theme)
- **Architecture:** Component-driven SPA, Client-side Routing, Responsive Design

### Backend
- **Runtime:** Node.js + Express.js
- **Database & ORM:** MySQL + Prisma ORM
- **Authentication:** JWT Authentication & bcrypt password hashing
- **Security:** Helmet, CORS, Express Rate Limiting, Input Sanitization

---

## 📁 Project Structure

```
portfolio/
├── frontend/             # Vite + TypeScript Client Application
│   ├── src/
│   │   ├── components/   # UI Components (Hero, About, Carousel3D, Services, Skills, etc.)
│   │   ├── pages/        # Public and Admin pages
│   │   ├── services/     # API Client Service
│   │   └── types/        # TypeScript Interfaces
│   └── public/           # Static assets & images
│
└── backend/              # Express + Prisma Server
    ├── prisma/           # Prisma schema & seed scripts
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Auth, Rate limiting, Error & Upload handlers
    │   ├── routes/       # API route declarations
    │   └── utils/        # JWT & helper utilities
    └── uploads/          # Uploaded project media
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server (e.g. XAMPP)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your DATABASE_URL in .env
npx prisma db push
npx prisma db seed
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Author
- **Name:** Md Iftakhar Ahmed Rifat
- **GitHub:** [@Ift4Kher](https://github.com/Ift4Kher)
- **LinkedIn:** [Iftakher Ahmed](https://www.linkedin.com/in/iftakher-ahmed-3b24a8244)

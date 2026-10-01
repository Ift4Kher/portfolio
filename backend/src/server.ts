import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes';
import heroRoutes from './routes/hero.routes';
import aboutRoutes from './routes/about.routes';
import servicesRoutes from './routes/services.routes';
import skillsRoutes from './routes/skills.routes';
import projectsRoutes from './routes/projects.routes';
import educationRoutes from './routes/education.routes';
import processRoutes from './routes/process.routes';
import contactRoutes from './routes/contact.routes';
import settingsRoutes from './routes/settings.routes';
import uploadRoutes from './routes/upload.routes';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static Uploads Serving
const uploadsPath = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Md Iftakhar Ahmed Rifat Portfolio & CMS API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/process', processRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Portfolio REST API Server running on port ${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

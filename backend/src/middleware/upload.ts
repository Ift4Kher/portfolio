import multer from 'multer';
import path from 'path';

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `file-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.pdf'];
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, WEBP, SVG, GIF, and PDF files are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

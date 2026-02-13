
import multer from "multer";

// Memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
 const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/jfif",
  "image/svg+xml",
  "application/pdf",
  "video/mp4", 
];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// Limits
const limits = { fileSize: 10 * 1024 * 1024 }; // 10MB

// ✅ Export Multer instance — do NOT call .fields() here
const upload = multer({ storage, fileFilter, limits });

export default upload;

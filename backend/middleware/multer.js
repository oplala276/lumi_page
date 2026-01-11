import multer, { diskStorage } from "multer";
import path from "path";

// Storage engine
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "application/pdf"];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

export default multer({ storage, fileFilter });

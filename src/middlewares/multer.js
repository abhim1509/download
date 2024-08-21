import multer from "multer";
import {
  documentsPath,
  imagesPath,
  updateFileNameIfDuplicateExists,
  getFilePath,
} from "../services/files/file.service.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (file.mimetype) {
      case "application/pdf":
        cb(null, documentsPath);
        break;
      case "image/jpeg":
        cb(null, imagesPath);
        break;
      default:
        cb({ error: "Mime type not supported" });
    }
  },
  filename: (req, file, cb) => {
    const filePath = getFilePath(file.mimetype);
    const fileName = updateFileNameIfDuplicateExists(
      filePath,
      file.originalname
    );
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

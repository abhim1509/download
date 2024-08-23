import multer from "multer";
import {
  documentsPath,
  imagesPath,
  updateFileNameIfDuplicateExists,
  getFilePath,
} from "../services/files/file.service.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Inside middleware diskstorage");
    switch (file.mimetype) {
      case "application/pdf":
        cb(null, documentsPath);
        break;
      case "image/jpeg":
        cb(null, imagesPath);
        break;
      default:
        // throw new Error("Mime type not supported.");
        cb("Mime type not supported");
    }
  },
  filename: (req, file, cb) => {
    const filePath = getFilePath(file.mimetype);
    const fileName = updateFileNameIfDuplicateExists(
      filePath,
      file.originalname
    );
    console.log(filePath, fileName);
    if (mimeMapping(fileName)) {
      cb(null, fileName);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg, pdf format allowed!"));
    }
  },
});

console.log("Storage", storage);
export const upload = multer({ storage: storage });

import { Router } from "express";
import {
  getFileById,
  uploadFile,
  deleteFileById,
  archiveFileById,
} from "./files.controller.js";
import { upload } from "../../middlewares/fileUpload.js";
const fileRouter = Router();

fileRouter.get("/:fileId", getFileById);
fileRouter.delete("/:fileId", deleteFileById);
fileRouter.get("/archive/:fileId", archiveFileById);
fileRouter.post("/upload", upload.any(), uploadFile);

export default fileRouter;

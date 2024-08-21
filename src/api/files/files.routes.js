import { Router } from "express";
import { getFileById, uploadFile } from "./files.controller.js";
import { upload } from "../../middlewares/multer.js";
const fileRouter = Router();

fileRouter.get("/:fileId", getFileById);
fileRouter.post("/upload", upload.any(), uploadFile);

export default fileRouter;

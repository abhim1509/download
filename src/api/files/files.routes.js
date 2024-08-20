import { Router } from "express";
import { getFileById } from "./files.controller.js";

const fileRouter = Router();

fileRouter.get("/:fileId", getFileById);

export default fileRouter;

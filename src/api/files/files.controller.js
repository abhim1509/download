import * as fs from "fs";
import {
  getFile,
  deleteFile,
  getFilePath,
  archivePath,
  moveFile,
  mimeMapping,
  getFileExtension,
} from "../../services/files/file.service.js";

export const getFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { mode = "preview" } = req.query;

    const filePath = getFile(fileId);
    console.log(filePath);
    if (mode === "download") {
      res.contentType("application/octet-stream"); // Forces download
      return res.download(filePath, (err) => {
        if (err) {
          console.error("Error during download:", err);
          res.status(500).send("Failed to download file.");
        }
      });
    }
    // Set appropriate content type for preview (e.g., "image/png" or "image/jpeg")
    // res.contentType("image/png"); // Change this according to your file type
    // res.contentType("application/pdf");
    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res).on("error", (err) => {
      console.error("Error streaming file:", err);
      res.status(500).send("Error streaming file.");
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const uploadFile = async (req, res, next) => {
  // console.log("Request", req);
  res.send("uploaded successfully");
};

export const deleteFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    const mimetype =
      fileId.split(".")[1] === "jpg" ? "image/jpeg" : "application/pdf";
    const result = await deleteFile(`${getFilePath(mimetype)}/${fileId}`);

    if (!result) {
      res.status(404);
      res.send("File not found.");
      return res;
    }
    res.status(201);
    res.send("File deleted successfully");
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const archiveFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    const mimetype = mimeMapping(getFileExtension(fileId));
    const src = `${getFilePath(mimetype)}/${fileId}`;
    console.log(src);
    const dest = `${archivePath}/${fileId}`;
    const result = moveFile(src, dest);
    await deleteFile(getFilePath(mimetype), fileId);

    res.status(200);
    res.send("File moved successfully");
  } catch (err) {
    console.error("Error occurred:", JSON.stringify(err));
    res.status(500).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

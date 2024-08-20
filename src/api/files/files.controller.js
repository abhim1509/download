import * as fs from "fs";
import { getFile } from "../../services/files/file.service.js";

export const getFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { mode = "preview" } = req.query;

    const filePath = getFile(fileId);

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
    res.contentType("image/png"); // Change this according to your file type

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

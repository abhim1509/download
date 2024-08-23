import * as fs from "fs";
import {
  deleteFile,
  archivePath,
  moveFile,
  getFileSource,
  ifFileExists,
} from "../../services/files/file.service.js";
import {
  FILE_NOT_FOUND,
  FILE_SAVED_SUCCESSFULLY,
  FILE_DELETED_SUCCESSFULLY,
  FILE_MOVED_SUCCESSFULLY,
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} from "../../services/files/constants.js";
import { logger } from "../../services/files/logger.service.js";

//This function gets a file by id.
export const getFileById = async (req, res) => {
  try {
    logger.info("In getFileById function");
    const { fileId } = req.params;
    const { mode = "preview" } = req.query;

    if (!fileId) {
      return res.status(400).send("Bad payload");
    }

    const src = getFileSource(fileId);
    if (!src || !ifFileExists(src)) {
      return res.status(STATUS_NOT_FOUND).send(FILE_NOT_FOUND);
    }

    if (mode === "download") {
      res.contentType("application/octet-stream"); // Forces download
      return res.download(filePath, (err) => {
        if (err) {
          logger.error(`Error during download: ${err}`);
          res
            .status(STATUS_INTERNAL_SERVER_ERROR)
            .send("Failed to download file.");
        }
      });
    }
    const readStream = fs.createReadStream(filePath);
    // res.contentType("application/pdf");
    //TODO:: view mode pdf is not working.

    readStream.pipe(res).on("error", (err) => {
      logger.info("Error streaming file:" + err);
      res.status(STATUS_INTERNAL_SERVER_ERROR).send("Error streaming file.");
    });
  } catch (err) {
    logger.error(`Error during fetching file: ${err}`);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

//This function uploads a file.
export const uploadFile = async (req, res, next) => {
  logger.info("In uploadFile function");

  res.status(STATUS_OK).send(FILE_SAVED_SUCCESSFULLY);
};

//This function deletes a file by id.
export const deleteFileById = async (req, res) => {
  try {
    logger.info("In deleteFileById function");

    const { fileId } = req.params;
    const src = getFileSource(fileId);
    if (!src || !ifFileExists(src)) {
      return res.status(STATUS_NOT_FOUND).send(FILE_NOT_FOUND);
    }

    await deleteFile(src);

    res.status(STATUS_OK).send(FILE_DELETED_SUCCESSFULLY);
  } catch (err) {
    logger.error(`Error during file deletion: ${err}`);

    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

//This function archives file by id.
export const archiveFileById = async (req, res) => {
  try {
    logger.info("In archiveFileById function");

    const { fileId } = req.params;
    const src = getFileSource(fileId);

    if (!src || !ifFileExists(src)) {
      return res.status(STATUS_NOT_FOUND).send(FILE_NOT_FOUND);
    }

    const dest = `${archivePath}/${fileId}`;
    moveFile(src, dest);
    await deleteFile(src);
    logger.info(FILE_DELETED_SUCCESSFULLY);
    res.status(STATUS_OK).send(FILE_MOVED_SUCCESSFULLY);
    return;
    //TODO:: Unknown error occurrence
  } catch (err) {
    logger.error(`Error during file archival: ${err}`);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      error: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

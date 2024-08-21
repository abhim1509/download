import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
// Get the directory path of the current module
export const getDirectoryPath = () => {
  return dirname(fileURLToPath(import.meta.url));
};

// Resolve the file path from the root directory
export const getFile = (fileId) => {
  const rootDirectory = getDirectoryPath();
  return resolve(rootDirectory, "../../../public", fileId);
};

export const documentsPath = "./public/documents";
export const imagesPath = "./public/images";

//This function updates file name if duplicate exists.
export const updateFileNameIfDuplicateExists = (path, file) => {
  if (fs.existsSync(path)) {
    console.log("Found file");
    const now = new Date().getTime();
    return now + file;
  }
  return file;
};

//Returns file path where files needs to be saved.
export const getFilePath = (mimetype) => {
  let filePath = "";
  switch (mimetype) {
    case "application/pdf":
      filePath = documentsPath;
      break;
    case "image/jpeg":
      filePath = imagesPath;
      break;
  }
  console.log("filePath", filePath);
  return filePath;
};

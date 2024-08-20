import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Get the directory path of the current module
export const getDirectoryPath = () => {
  return dirname(fileURLToPath(import.meta.url));
};

// Resolve the file path from the root directory
export const getFile = (fileId) => {
  const rootDirectory = getDirectoryPath();
  return resolve(rootDirectory, "../../../public", fileId);
};

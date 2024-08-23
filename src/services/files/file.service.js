import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
// Get the directory path of the current module
export const getDirectoryPath = () => {
  return dirname(fileURLToPath(import.meta.url));
};

export const documentsPath = "./public/documents";
export const imagesPath = "./public/images";
export const archivePath = "./public/archive";
//This function updates file name if duplicate exists.
export const updateFileNameIfDuplicateExists = (path, file) => {
  if (fs.existsSync(`${path}/${file}`)) {
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
  return filePath;
};

//The functions deletes a file.
export const deleteFile = async (file) => {
  if (!fs.existsSync(file)) {
    return Promise.resolve("");
  }
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err);
      resolve(`Deleted ${file}`);
    });
  });
};

//This function moves a file from source to destination.
export const moveFile = (src, dest) => {
  console.log(src, dest);
  const from = fs.createReadStream(src);
  const to = fs.createWriteStream(dest);

  from.pipe(to);
  from.on("end", function () {
    return "File moved successfully.";
  });
  from.on("error", function (err) {
    throw new Error("An error occured while moving file" + err);
  });
};

//This function doest the MIME mapping based on extension.
export const mimeMapping = (ext) => {
  switch (ext) {
    case "jpg":
      return "image/jpeg";
    case "pdf":
      return "application/pdf";
    default:
      return null;
  }
};

//This function returns the file extension based on file name received.
export const getFileExtension = (fileName) => {
  return fileName.split(".")[1];
};

//This functions check if file exists or not.
export const ifFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

//This functions returns the path of the file.
export const getFileSource = (fileId) => {
  const mimetype = mimeMapping(getFileExtension(fileId));
  return `${getFilePath(mimetype)}/${fileId}` || "";
};

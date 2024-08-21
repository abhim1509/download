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
  console.log("mimetype", mimetype);
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

export const deleteFile = (path, file) => {
  if (!fs.existsSync(path + `/${file}`)) {
    return Promise.resolve("");
  }
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err);
      resolve(`Deleted ${file}`);
    });
  });
};

export const moveFile = (src, dest) => {
  const from = fs.createReadStream(src);
  const to = fs.createWriteStream(dest);

  from.pipe(to);
  from.on("end", function () {
    return "File moved successfully.";
  });
  // source.on("error", function (err) {
  //   throw new Error("An error occured while moving file", err);
  // });
};

import * as fs from "fs";
import { dirname, resolve } from "path";
import * as stream from "stream";
import { fileURLToPath } from "url";

export const imagePreview = (fieldId, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const imagePath = resolve(__dirname, `images/${fieldId}.jpg`);

  const r = fs.createReadStream(imagePath);
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, (err) => {
    if (err) {
      res.statusMessage = "Resource Not found";
      res.status(400).end();

      console.log(err);
    }
  });
  ps.pipe(res);
};

export const imageDownload = (fieldId) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return resolve(__dirname, `images/${fieldId}.jpg`);
};

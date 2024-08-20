import express, { query } from "express";
import { imagePreview, imageDownload } from "./file.js";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/download/:fieldId", function (req, res) {
  const fieldId = req?.params?.fieldId;
  let mode = req?.query?.mode;
  mode = !mode ? "download" : mode;
  console.log(mode);
  if (!fieldId) {
    res.statusMessage = "Bad request";
    res.status(400).end();
  }
  console.log(mode);
  if (mode === "download") {
    res.download(imageDownload(fieldId));
    res.contentType("image/png");
  } else {
    return imagePreview(fieldId, res);
  }
});

app.listen(5009);
console.log("App started");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

import express from "express";
import fileRouter from "./src/api/files/files.routes.js";
import { PORT } from "./src/config.js";

const app = express();

app.use("/files", fileRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Makker file Server" });
});

const server = app.listen(PORT, () => {
  console.log(`App is running on port http://localhost:${PORT}`);
});

// Gracefully handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Gracefully handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Gracefully handle termination signals
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
});

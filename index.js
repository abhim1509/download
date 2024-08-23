import express, { json } from "express";
import fileRouter from "./src/api/files/files.routes.js";
import { PORT } from "./src/config.js";
import compression from "compression";
import { logger } from "./src/services/files/logger.service.js";
const app = express();
app.use(compression());

app.use("/files", fileRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to file Server" });
});

//Starts a server.
const server = app.listen(PORT, () => {
  logger.info(`App is running on port http://localhost:${PORT}`);
});

// Gracefully handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error(`UNCAUGHT EXCEPTION: ${JSON.stringify(err)}`);
  process.exit(1);
});

// Gracefully handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error(`UNCAUGHT REJECTION: ${JSON.stringify(err)}`);

  server.close(() => {
    process.exit(1);
  });
});

// Gracefully handle termination signals
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    logger.error(`Received ${signal}. Shutting down gracefully...`);

    server.close(() => {
      logger.info("Server closed.");
      process.exit(0);
    });
  });
});

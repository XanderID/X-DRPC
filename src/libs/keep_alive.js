import express from "express";
import { logSuccess, logError } from "../libs/logger.js";

/**
 * Starts a lightweight HTTP server to keep the application alive.
 * Commonly used for uptime monitoring or preventing hosting platforms from idling the app.
 *
 * The server responds with a simple message on the root endpoint ("/").
 *
 * @param {number} [port=3000] - The port number the server will listen on. Defaults to 3000.
 * @returns {Promise<void>} A promise that resolves when the server starts successfully, or rejects on error.
 */
export function startServer(port = 3000) {
  return new Promise((resolve, reject) => {
    const app = express();

    app.get("/", (_, res) => {
      res.send("X-Discord Rich Presence has been Started!");
    });

    const server = app.listen(port, () => {
      logSuccess(`Keep Alive Server runs successfully on port ${port}`);
      resolve();
    });

    server.on("error", (err) => {
      logError(
        `Failed to start Keep Alive Server on port ${port}: ${err.message}`,
      );
      reject(err);
    });
  });
}

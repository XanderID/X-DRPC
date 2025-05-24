import { WatchFolder, WatchFile } from "module-monitor";
import path from "path";
import {
  logError,
  logInfo,
  logSuccess,
  logWarning,
  printText,
  startupLog,
} from "../libs/logger.js";
import { config } from "../config.js";
import { startServer } from "../libs/keep_alive.js";
import { startClient, isClientReady } from "./client.js";
import {
  addPresence,
  getCurrent,
  updatePresence,
  validatePresence,
} from "./presence.js";
import { countFiles } from "../libs/function.js";

/**
 * Load and validate all presence files from the presence directory.
 */
async function loadPresence() {
  const totalPresence = countFiles("./src/presence");
  logInfo(`Validating a total of ${totalPresence} Presence`);

  const presence = new WatchFolder("../presence");
  const configW = new WatchFile("../config.js");

  let loadedCount = 0;
  let firstRunCompleted = false;
  let validCount = 0;
  let errorCount = 0;

  const allLoaded = new Promise((resolve) => {
    presence.setOnReload(async (mod, file, err) => {
      let presenceFile = path.basename(file);
      let presenceId = mod?.presence?.id || presenceFile;

      if (err) {
        logError(`Can't load presence ${presenceId} because ${err}`);
        errorCount++;
      } else {
        let presenceData = mod.presence;
        let validated = await validatePresence(presenceData);
        if (!validated.valid) {
          let errorList = validated.errors.map((e) => `- ${e}`).join("\n");
          logWarning(
            `Failed to Load Presence ${presenceId} in ${presenceFile}\n${errorList}`,
          );
          errorCount++;
        } else {
          addPresence(presenceId, presenceData);
          logSuccess(
            `Successfully load the Presence ${presenceId} from ${presenceFile}`,
          );

          if (config.update_save && getCurrent() === presenceId) {
            await updatePresence(presenceId);
          }

          validCount++;
        }
      }

      if (!firstRunCompleted) {
        loadedCount++;
        if (loadedCount === totalPresence) {
          firstRunCompleted = true;
          resolve({
            valid: validCount,
            error: errorCount,
            total: totalPresence,
          });
        }
      }
    });

    configW.setOnReload(async (mod, file, err) => {
      if (err) {
        logError(`Can't load config because ${err}`);
      } else {
        if (getCurrent() !== mod.config.presence) {
          await updatePresence(mod.config.presence);
        }
      }
    });
  });

  return allLoaded;
}

/**
 * Start the X-Discord RPC!
 */
async function start() {
  const presences = await loadPresence();
  logInfo(
    `Presence loaded: ${presences.valid} valid, ${presences.error} errors, out of ${presences.total} total`,
  );

  printText("");
  if (config.keep_alive.enable) {
    const keepAlivePort = config.keep_alive.port;
    logInfo("Turning on the Keep Alive Server...");
    await startServer(keepAlivePort);
  } else {
    logInfo("Keep Alive Server is turned off, you can turn it on in config.js");
  }

  logInfo("Trying Login to Discord...");

  startClient()
    .then(async (client) => {
      logInfo(`Successfully login to Discord as ${client.user.username}`);

      await updatePresence(config.presence);
    })
    .catch((error) => {
      logError(error);
    });
}

startupLog();
setTimeout(async () => {
  await start();
}, 3000);

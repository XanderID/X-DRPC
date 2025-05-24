import { ActivityTypes, PlatformType } from "../client/type.js";
import { logInfo, logSuccess, logWarning } from "../libs/logger.js";
import { isClientReady, parsePresence, setPresence } from "./client.js";

let currentId = null;
const presences = new Map();

/**
 * Set the current active presence ID.
 * @param {string} id - ID of the presence to mark as current.
 */
export function setCurrent(id) {
  currentId = id;
}

/**
 * Get the currently active presence data.
 * @returns {string|null} The current presence data or null if not set or not found.
 */
export function getCurrent() {
  return currentId;
}

/**
 * Updates the Discord Rich Presence to the specified presence ID.
 *
 * @param {string} presenceId - The unique ID of the presence to be applied.
 * @returns {Promise<void>} A promise that resolves when the presence has been successfully updated.
 */
export async function updatePresence(presenceId) {
  let presence = getPresence(presenceId);
  if (!isClientReady) {
    logWarning(
      `Failed to change the presence to ${presenceId} because the client is not connected`,
    );
    return;
  }

  if (presence == null) {
    logWarning(
      `Failed to change presence to ${presenceId} due to missing configuration`,
    );
    return;
  }

  logInfo(`Updating Presence to ${presenceId} Please wait...`);

  let parsedPresence = await parsePresence(presence);
  await setPresence(parsedPresence);

  logSuccess(`Presence is successfully Set to ${presenceId}`);
  setCurrent(presenceId);
}

/**
 * Add a new presence entry.
 * @param {string} id - Unique ID for the presence.
 * @param {object} data - Presence data.
 */
export function addPresence(id, data) {
  presences.set(id, data);
}

/**
 * Remove a presence entry by ID.
 * @param {string} id - ID of the presence to remove.
 * @returns {boolean} True if the presence was removed successfully.
 */
export function removePresence(id) {
  return presences.delete(id);
}

/**
 * Check if a presence entry exists
 * @param {string} id - Unique ID for the presence
 * @returns {boolean} - True if the presence exists
 */
export function hasPresence(id) {
  return presences.has(id);
}

/**
 * Get a presence entry by ID
 * @param {string} id
 * @returns {object|null}
 */
export function getPresence(id) {
  return presences.get(id) || null;
}

/**
 * Get all stored presence entries
 * @returns {object[]} - Array of all presence entries
 */
export function getAll() {
  return Array.from(presences.values());
}

/**
 * Validate a presence object against the required schema
 * @param {object} presence - Presence data to validate
 * @returns {Promise<{ valid: boolean, errors: string[] }>}
 */
export function validatePresence(presence) {
  return new Promise((resolve) => {
    const errors = [];

    if (typeof presence.id !== "string" || !presence.id.trim()) {
      errors.push('Property "id" is required and must be a non-empty string.');
    }

    if (
      presence.application_id !== undefined &&
      typeof presence.application_id !== "string"
    ) {
      errors.push('Property "application_id" must be a string if provided.');
    }

    if (typeof presence.name !== "string" || !presence.name.trim()) {
      errors.push(
        'Property "name" is required and must be a non-empty string.',
      );
    }

    const validTypes = Object.values(ActivityTypes);
    if (
      typeof presence.type !== "string" ||
      !validTypes.includes(presence.type)
    ) {
      errors.push(
        `Property "type" must be one of ActivityTypes values: ${validTypes.join(
          ", ",
        )}.`,
      );
    }

    const validPlatforms = Object.values(PlatformType);
    if (
      presence.platform !== undefined &&
      (typeof presence.platform !== "string" ||
        !validPlatforms.includes(presence.platform))
    ) {
      errors.push(
        `Property "platform" must be one of: ${validPlatforms.join(", ")}.`,
      );
    }

    ["url", "details", "state"].forEach((field) => {
      if (
        presence[field] !== undefined &&
        typeof presence[field] !== "string"
      ) {
        errors.push(`Property "${field}" must be a string if provided.`);
      }
    });

    if (presence.timestamps !== undefined) {
      if (
        typeof presence.timestamps !== "object" ||
        presence.timestamps === null
      ) {
        errors.push(
          'Property "timestamps" must be an object with optional "start" and/or "end".',
        );
      } else {
        ["start", "end"].forEach((ts) => {
          if (
            presence.timestamps[ts] !== undefined &&
            typeof presence.timestamps[ts] !== "number"
          ) {
            errors.push(`Timestamps.${ts} must be a number if provided.`);
          }
        });
      }
    }

    if (presence.buttons !== undefined) {
      if (!Array.isArray(presence.buttons) || presence.buttons.length > 2) {
        errors.push(
          'Property "buttons" must be an array of up to 2 button objects.',
        );
      } else {
        presence.buttons.forEach((btn, idx) => {
          if (typeof btn !== "object" || btn === null) {
            errors.push(`Button at index ${idx} must be an object.`);
          } else {
            if (typeof btn.label !== "string") {
              errors.push(`Button.label at index ${idx} must be a string.`);
            }
            if (typeof btn.url !== "string") {
              errors.push(`Button.url at index ${idx} must be a string.`);
            }
          }
        });
      }
    }

    if (
      presence.assets !== undefined &&
      (typeof presence.assets !== "object" || presence.assets === null)
    ) {
      errors.push('Property "assets" must be an object if provided.');
    }

    if (presence.party !== undefined) {
      if (typeof presence.party !== "object" || presence.party === null) {
        errors.push('Property "party" must be an object if provided.');
      } else {
        if (
          presence.party.id !== undefined &&
          typeof presence.party.id !== "string"
        ) {
          errors.push("Party.id must be a string if provided.");
        }
        ["max", "current"].forEach((numField) => {
          const val = presence.party[numField];
          if (val !== undefined && (!Number.isInteger(val) || val < 0)) {
            errors.push(
              `Party.${numField} must be a non-negative integer if provided.`,
            );
          }
        });
      }
    }

    if (presence.secrets !== undefined) {
      if (typeof presence.secrets !== "object" || presence.secrets === null) {
        errors.push('Property "secrets" must be an object if provided.');
      } else if (
        presence.secrets.join !== undefined &&
        typeof presence.secrets.join !== "string"
      ) {
        errors.push("Secrets.join must be a string if provided.");
      }
    }

    resolve({ valid: errors.length === 0, errors });
  });
}

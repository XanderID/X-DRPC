import fs from "fs";
import path from "path";

/**
 * Counts the number of files in a folder (non-recursive).
 * @param {string} folderPath - The path to the folder.
 * @returns {number} Number of files.
 */
export function countFiles(folderPath) {
  const items = fs.readdirSync(folderPath);
  let count = 0;

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isFile()) {
      count++;
    }
  }

  return count;
}

/**
 * Check if a given string is a valid HTTP or HTTPS URL.
 * @param {string} str - The string to check.
 */
export function isURL(str) {
  return typeof str === "string" && /^https?:\/\//.test(str);
}

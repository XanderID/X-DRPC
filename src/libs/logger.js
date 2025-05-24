import chalk from "chalk";

/**
 * Print text to the console.
 * @param {string} text - The text to print.
 */
export function printText(text) {
  console.log(text);
}

/**
 * Displays a startup banner
 */
export function startupLog() {
  const asciiBanner = `
 __  __     ____  ____  ____   ____ 
 \\ \\/ /    |  _ \\|  _ \\|  _ \\ / ___|
  \\  /_____| | | | |_) | |_) | |    
  /  \\_____| |_| |  _ <|  __/| |___ 
 /_/\\_\\    |____/|_| \\_\\_|    \\____|
                                    
`;

  printText(chalk.blue(asciiBanner));
  printText("Welcome to X-Discord Rich Presence!\n");
}

/**
 * Gets the current time formatted as "HH:MM:SS:MMM" where MMM is milliseconds.
 * @returns {string} Formatted time string.
 */
function getTime() {
  const now = new Date();
  const time = now.toTimeString().split(" ")[0];
  const ms = now.getMilliseconds().toString().padStart(3, "0");
  return `${time}:${ms}`;
}

/**
 * Logs a message with a level tag and colored level text.
 * @param {string} level - The log level (e.g., INFO, ERROR).
 * @param {string} message - The message to log.
 * @param {(text: string) => string} colorFn - Chalk color function to color the level.
 */
function logWithLevel(level, message, colorFn) {
  printText(`${getTime()} [ ${colorFn(level)} ] ${message}`);
}

/**
 * Logs an info message in blue color.
 * @param {string} message - The info message.
 */
export function logInfo(message) {
  logWithLevel("INFO", message, chalk.blue);
}

/**
 * Logs a warning message in yellow color.
 * @param {string} message - The warning message.
 */
export function logWarning(message) {
  logWithLevel("WARNING", message, chalk.yellow);
}

/**
 * Logs an error message in red color.
 * @param {string} message - The error message.
 */
export function logError(message) {
  logWithLevel("ERROR", message, chalk.red);
}

/**
 * Logs a success message in green color.
 * @param {string} message - The success message.
 */
export function logSuccess(message) {
  logWithLevel("SUCCESS", message, chalk.green);
}

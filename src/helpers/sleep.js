/**
 * Function that waits for a number milliseconds.
 * @param {number} ms - The number of milliseconds to wait.
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

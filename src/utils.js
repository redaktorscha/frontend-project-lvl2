import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 *
 * @param {string} filename
 * @returns {string}
 */
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/**
 *
 * @param {string} filename
 * @returns {JSON|string}
 */
export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @param {string} filename
 * @returns {string}
 */
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/**
 * @param {string} filepath
 * @returns {string}
 */
export const getAbsFilePath = (filepath) => path.resolve(filepath);

/**
 * @param {string} file name or path
 * @param {Function} fn
 * @returns {string}
 */
export const readFile = (file, fn) => readFileSync(fn(file), 'utf-8');

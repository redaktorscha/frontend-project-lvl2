import { readFileSync } from 'fs';
import path from 'path';

/**
 * @param {string} filepath
 * @returns {string}
 */
export const readFile = (filepath) => readFileSync(path.resolve(filepath), 'utf-8');

/**
 * @param {string} filepath
 * @returns {string}
 */
export const getFileFormat = (filepath) => path.extname(filepath).slice(1);

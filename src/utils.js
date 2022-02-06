import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

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
 * @param {string} file
 * @param {Function} fn
 * @returns {string}
 */
export const readFile = (file, fn) => readFileSync(fn(file), 'utf-8');

/**
 * @param {*} obj
 * @returns {boolean}
 */
export const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

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

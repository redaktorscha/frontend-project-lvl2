import path from 'path';
import YAML from 'yaml';
import { readFile, getFilePath } from './utils.js';

/**
 * @param {string} format
 * @param {string} content
 * @returns {Object | Error}
 */
const parser = (format, content) => {
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yml' || format === 'yaml') {
    return YAML.parse(content);
  }
  throw new Error('Wrong file format');
};

/**
 * @param {string} filepath
 * @returns {Object | Error}
 */
const getParsedData = (filepath) => {
  const fileFormat = path.extname(filepath).slice(1);
  const fileContent = readFile(filepath, getFilePath);
  return parser(fileFormat, fileContent);
};

export default getParsedData;

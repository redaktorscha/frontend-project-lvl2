import path from 'path';
import YAML from 'yaml';
import { readFile, getAbsFilePath } from './utils.js';

/**
 * @param {string} format
 * @param {string} content
 * @returns {Object | Error}
 */
const parser = (format, content) => {
  if (format === '.json') {
    return JSON.parse(content);
  }
  if (format === '.yml' || format === '.yaml') {
    return YAML.parse(content);
  }
  throw new Error('Wrong file format');
};

/**
 * @param {string} filepath
 * @returns {Object | Error}
 */
const getParsedObject = (filepath) => {
  const fileFormat = path.extname(filepath);
  try {
    const fileContent = readFile(filepath, getAbsFilePath);
    return parser(fileFormat, fileContent);
  } catch (err) {
    if (err.name === 'YAMLParseError') {
      const yamlErrorMessage = `Incorrect YAML\n${err.message}`;
      throw new Error(yamlErrorMessage);
    }
    throw new Error(err.message);
  }
};

export default getParsedObject;

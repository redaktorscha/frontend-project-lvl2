import path from 'path';
import YAML from 'yaml';
import { readFile, getAbsFilePath } from './utils.js';

/**
 * @param {string} format
 * @param {string} content
 * @returns {Object | Error}
 */
const parser = (format, content) => {
  let parsingFn;
  if (format === '.json') {
    parsingFn = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parsingFn = YAML.parse;
  } else {
    throw new Error('Wrong file format');
  }
  return parsingFn(content);
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
      err.message = `Incorrect file\n${err.message}`;
    }
    throw new Error(err.message);
  }
};

export default getParsedObject;

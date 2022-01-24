import { readFileSync } from 'fs';
import path from 'path';

/**
 * @param {string} filepath
 * @returns {Object | Error}
 */
const getParsedObject = (filepath) => {
  try {
    const fileContent = readFileSync(path.resolve(filepath), 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getParsedObject;

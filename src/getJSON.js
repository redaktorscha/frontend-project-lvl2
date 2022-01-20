import { readFileSync } from 'fs';
import path from 'path';

/**
 * @param {string} filepath
 * @returns {JSON | Error}
 */
const getJSON = (filepath) => {
  try {
    const FileContent = readFileSync(path.resolve(filepath), 'utf8');
    return FileContent;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getJSON;

import { readFileSync } from 'fs';
import path from 'path';

/**
 * @param {string} filepath
 * @returns {JSON | Error}
 */
const getJSON = (filepath) => {
  // const fileExtention = filepath.split('.').slice(-1).toString();
  // console.log(fileExtention);
  try {
    const FileContent = readFileSync(path.resolve(filepath), 'utf8');
    return FileContent;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getJSON;

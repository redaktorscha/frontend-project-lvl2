import getJSON from './src/getJSON.js';
import compareObjects from './src/compareObjects.js';

/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @returns {string | Error}
 */
const genDiff = (filepath1, filepath2) => {
  try {
    const file1 = getJSON(filepath1);
    const file2 = getJSON(filepath2);
    return compareObjects(JSON.parse(file1), JSON.parse(file2));
  } catch (err) {
    return err.message;
  }
};

export default genDiff;

import getParsedObject from './src/parsers.js';
import { compareObjects } from './src/compareObjects.js';

/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @returns {string}
 */
const genDiff = (filepath1, filepath2) => {
  try {
    if (!filepath2 || (!filepath1 && !filepath2)) {
      throw new Error('Missing required argument(s) <filepath1> <filepath2>');
    }
    const obj1 = getParsedObject(filepath1);
    const obj2 = getParsedObject(filepath2);
    return compareObjects(obj1, obj2);
  } catch (err) {
    return err.message;
  }
};

export default genDiff;

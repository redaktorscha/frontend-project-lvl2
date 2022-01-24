import getParsedObject from './src/getParsedObject.js';
import compareObjects from './src/compareObjects.js';

/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @returns {string | Error}
 */
const genDiff = (filepath1, filepath2) => {
  try {
    const obj1 = getParsedObject(filepath1);
    const obj2 = getParsedObject(filepath2);
    return compareObjects(obj1, obj2);
  } catch (err) {
    return err.message;
  }
};

export default genDiff;

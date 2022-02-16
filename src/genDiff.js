import getParsedObject from './parsers.js';
import compareObjects from './compareObjects.js';
import chooseFormatter from './formatters/index.js';
/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @returns {string}
 */
const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  try {
    const obj1 = getParsedObject(filepath1);
    const obj2 = getParsedObject(filepath2);
    const formatter = chooseFormatter(formatterName);
    return formatter(compareObjects(obj1, obj2));
  } catch (err) {
    throw new Error(err.message);
  }
};

export default genDiff;

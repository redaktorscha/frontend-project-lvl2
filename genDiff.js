import getParsedObject from './src/parsers.js';
import compareObjects from './src/compareObjects.js';
import stylish from './src/formatters.js';

/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @returns {string}
 */
const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  try {
    if (!filepath2 || (!filepath1 && !filepath2)) {
      throw new Error('Missing required argument(s) <filepath1> <filepath2>');
    }
    let formatter;
    if (formatterName === 'stylish') {
      formatter = stylish;
    }
    const obj1 = getParsedObject(filepath1);
    const obj2 = getParsedObject(filepath2);
    return formatter(compareObjects(obj1, obj2));
  } catch (err) {
    return err.message;
  }
};

export default genDiff;

import { isObject } from '../utils.js';

/**
 * @param {*} val
 */
const stringifyValue = (val) => {
  if (!isObject(val)) {
    return typeof val === 'string' ? `'${val}'` : `${val}`;
  }
  return `[complex value]`;
};

/**
 * @param {Array} diffArr
 * @returns {string}
 */
const plain = (diffArr) => {
  /**
   * @param {Array} arr
   * @param {Array} accumulator
   * @param {number} depth
   */
  const recursiveStringify = (arr, accumulator, depth) => {
    const result = arr.map((elem) => {
      const { key, values, meta } = elem;
      const { wasAdded, wasRemoved, wasUpdated, isNested } = meta;
      if (!isNested) {
        let [value1, value2] = values;
        value1 = stringifyValue(value1);
        value2 = stringifyValue(value2);
        const currentKey = depth > 1 ? `'${[...accumulator, key].join('.')}'` : `'${key}'`;
        if (wasAdded) {
          return `Property ${currentKey} was added with value: ${value1}`;
        }
        if (wasRemoved) {
          return `Property ${currentKey} was removed`;
        }
        if (wasUpdated) {
          return `Property ${currentKey} was updated. From ${value1} to ${value2}`;
        }
        return '';
      }
      return recursiveStringify(values, [...accumulator, key], depth + 1);
    });
    return result.filter((el) => el.length).join('\n');
  };

  return recursiveStringify(diffArr, [], 1);
};
export default plain;

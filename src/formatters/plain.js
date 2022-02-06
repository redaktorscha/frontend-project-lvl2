import _ from 'lodash';
import { isObject } from '../utils.js';

/**
 * @param {*} val
 * @returns {string}
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
      if (!_.has(elem, 'children')) {
        const { key, values, meta } = elem;
        const { wasAdded, wasRemoved, wasUpdated } = meta;
        const [value1, value2] = values;
        const stringifiedValue1 = stringifyValue(value1);
        const stringifiedValue2 = stringifyValue(value2);
        const currentKey = depth > 1 ? `'${[...accumulator, key].join('.')}'` : `'${key}'`;
        if (wasAdded) {
          return `Property ${currentKey} was added with value: ${stringifiedValue1}`;
        }
        if (wasRemoved) {
          return `Property ${currentKey} was removed`;
        }
        if (wasUpdated) {
          return `Property ${currentKey} was updated. From ${stringifiedValue1} to ${stringifiedValue2}`;
        }
        return '';
      }
      const { key, children } = elem;
      return recursiveStringify(children, [...accumulator, key], depth + 1);
    });
    return result.filter((el) => el.length).join('\n');
  };

  return recursiveStringify(diffArr, [], 1);
};
export default plain;

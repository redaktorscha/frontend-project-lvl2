import { isObject } from '../utils.js';

/**
 * @param {*} val
 * @returns {string}
 */
const stringifyValue = (val) => {
  if (!isObject(val)) {
    return typeof val === 'string' ? `'${val}'` : `${val}`;
  }
  return '[complex value]';
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
   * @returns {string}
   */
  const diffOutput = (arr, accumulator, depth) => {
    const result = arr.map((elem) => {
      const { type } = elem;
      if (type === 'nested') {
        const { key, children } = elem;
        return diffOutput(children, [...accumulator, key], depth + 1);
      }

      const {
        key, value1, value2,
      } = elem;
      const strVal1 = stringifyValue(value1);
      const strVal2 = stringifyValue(value2);
      const currentKey = depth > 1 ? `'${[...accumulator, key].join('.')}'` : `'${key}'`;
      if (type === 'added') {
        return `Property ${currentKey} was added with value: ${strVal1}`;
      }
      if (type === 'removed') {
        return `Property ${currentKey} was removed`;
      }
      if (type === 'updated') {
        return `Property ${currentKey} was updated. From ${strVal1} to ${strVal2}`;
      }
      return '';
    });
    return result.filter((el) => el.length).join('\n');
  };

  return diffOutput(diffArr, [], 1);
};
export default plain;

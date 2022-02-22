import { isObject } from '../utils.js';

const indent = 4;

const tagSize = 2;

/**
 * @param {number} tabSize
 * @returns {string}
 */
const tab = (tabSize) => ' '.repeat(tabSize);

/**
 * @param {*} obj
 * @param {number} depth
 * @returns {string}
 */
const stringifyObject = (obj, depth) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return `${tab(depth)}${key}: {\n${stringifyObject(obj[key], depth + indent)}\n${tab(depth)}}`;
    }
    return `${tab(depth)}${key}: ${obj[key]}`;
  });
  return `${result.join('\n')}`;
};

/**
 * @param {Array} diffArr
 * @returns {string}
 */
const stylish = (diffArr) => {
  /**
   * @param {Object} arr
   * @param {number} depth
   * @returns {string}
   */
  const diffOutput = (arr, depth) => {
    const result = arr.map((elem) => {
      const { type } = elem;

      if (type === 'nested') {
        const { key, children } = elem;
        return `${tab(depth)}${key}: {\n${diffOutput(children, depth + indent)}\n${tab(depth)}}`;
      }

      const {
        key, value1, value2,
      } = elem;
      const strVal1 = isObject(value1)
        ? `{\n${stringifyObject(value1, depth + indent)}\n${tab(depth)}}`
        : value1;
      const strVal2 = isObject(value2)
        ? `{\n${stringifyObject(value2, depth + indent)}\n${tab(depth)}}`
        : value2;

      if (type === 'added') {
        return `${tab(depth - tagSize)}+ ${key}: ${strVal1}`;
      }
      if (type === 'removed') {
        return `${tab(depth - tagSize)}- ${key}: ${strVal1}`;
      }
      if (type === 'updated') {
        return `${tab(depth - tagSize)}- ${key}: ${strVal1}\n${tab(
          depth - tagSize,
        )}+ ${key}: ${strVal2}`;
      }
      return `${tab(depth)}${key}: ${value1}`;
    });
    return result.join('\n');
  };
  return `{\n${diffOutput(diffArr, indent)}\n}`;
};

export default stylish;

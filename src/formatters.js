import { isObject } from './utils.js';

const indent = 4;

/**
 * @param {number} tabSize
 * @returns {string}
 */
const makeTab = (tabSize) => ' '.repeat(tabSize);

/**
 * @param {*} obj
 * @param {number} depth
 * @returns {string}
 */
const stringify = (obj, depth) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return `${makeTab(depth)}${key}: {\n${stringify(obj[key], depth + indent)}\n${makeTab(depth)}}`;
    }
    return `${makeTab(depth)}${key}: ${obj[key]}`;
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
   */
  const recLog = (arr, depth) => {
    const result = arr.map((elem) => {
      const { key, values, meta } = elem;
      const { wasAdded, wasRemoved, wasUpdated, isNested } = meta;
      if (isNested) {
        return `${makeTab(depth)}${key}: {\n${recLog(values, depth + indent)}\n${makeTab(depth)}}`;
      }

      let [value1, value2] = values;
      value1 = isObject(value1) ? `{\n${stringify(value1, depth + indent)}\n${makeTab(depth)}}` : value1;
      value2 = isObject(value2) ? `{\n${stringify(value2, depth + indent)}\n${makeTab(depth)}}` : value2;
      if (wasAdded) {
        return `${makeTab(depth - 2)}+ ${key}: ${value1}`;
      }
      if (wasRemoved) {
        return `${makeTab(depth - 2)}- ${key}: ${value1}`;
      }
      if (wasUpdated) {
        return `${makeTab(depth - 2)}- ${key}: ${value1}\n${makeTab(depth - 2)}+ ${key}: ${value2}`;
      }
      return `${makeTab(depth)}${key}: ${value1}`;
    });
    return `${result.join('\n')}`;
  };
  return `{\n${recLog(diffArr, indent)}\n}`;
};

export default stylish;

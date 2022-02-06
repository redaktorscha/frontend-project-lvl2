import _ from 'lodash';
import { isObject } from '../utils.js';

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
const stringifyObject = (obj, depth) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return `${makeTab(depth)}${key}: {\n${stringifyObject(obj[key], depth + indent)}\n${makeTab(depth)}}`;
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
  const tagSize = 2;
  /**
   * @param {Object} arr
   * @param {number} depth
   */
  const recursiveStringify = (arr, depth) => {
    const result = arr.map((elem) => {
      if (!_.has(elem, 'children')) {
        const { key, values, meta } = elem;
        const { wasAdded, wasRemoved, wasUpdated } = meta;
        const [value1, value2] = values;
        const stringifiedValue1 = isObject(value1)
          ? `{\n${stringifyObject(value1, depth + indent)}\n${makeTab(depth)}}`
          : value1;
        const stringifiedValue2 = isObject(value2)
          ? `{\n${stringifyObject(value2, depth + indent)}\n${makeTab(depth)}}`
          : value2;

        if (wasAdded) {
          return `${makeTab(depth - tagSize)}+ ${key}: ${stringifiedValue1}`;
        }
        if (wasRemoved) {
          return `${makeTab(depth - tagSize)}- ${key}: ${stringifiedValue1}`;
        }
        if (wasUpdated) {
          return `${makeTab(depth - tagSize)}- ${key}: ${stringifiedValue1}\n${makeTab(
            depth - tagSize,
          )}+ ${key}: ${stringifiedValue2}`;
        }
        return `${makeTab(depth)}${key}: ${value1}`;
      }
      const { key, children } = elem;
      return `${makeTab(depth)}${key}: {\n${recursiveStringify(children, depth + indent)}\n${makeTab(depth)}}`;
    });
    return result.join('\n');
  };
  return `{\n${recursiveStringify(diffArr, indent)}\n}`;
};

export default stylish;

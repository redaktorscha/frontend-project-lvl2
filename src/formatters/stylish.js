/* eslint-disable prettier/prettier */
import _ from 'lodash';
import { isObject } from '../utils.js';

const indent = 4;

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
  const tagSize = 2;
  /**
   * @param {Object} arr
   * @param {number} depth
   */
  const makeDiffString = (arr, depth) => {
    const result = arr.map((elem) => {
      if (!_.has(elem, 'children')) {
        const {
          key,
          values,
          meta
        } = elem;
        const {
          added,
          removed,
          updated
        } = meta;
        const [value1, value2] = values;
        const stringifiedValue1 = isObject(value1) ?
          `{\n${stringifyObject(value1, depth + indent)}\n${tab(depth)}}` :
          value1;
        const stringifiedValue2 = isObject(value2) ?
          `{\n${stringifyObject(value2, depth + indent)}\n${tab(depth)}}` :
          value2;

        if (added) {
          return `${tab(depth - tagSize)}+ ${key}: ${stringifiedValue1}`;
        }
        if (removed) {
          return `${tab(depth - tagSize)}- ${key}: ${stringifiedValue1}`;
        }
        if (updated) {
          return `${tab(depth - tagSize)}- ${key}: ${stringifiedValue1}\n${tab(
            depth - tagSize,
          )}+ ${key}: ${stringifiedValue2}`;
        }
        return `${tab(depth)}${key}: ${value1}`;
      }
      const {
        key,
        children
      } = elem;
      return `${tab(depth)}${key}: {\n${makeDiffString(children, depth + indent)}\n${tab(depth)}}`;
    });
    return result.join('\n');
  };
  return `{\n${makeDiffString(diffArr, indent)}\n}`;
};

export default stylish;
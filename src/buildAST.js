import _ from 'lodash';
import { isObject } from './utils.js';

/**
 * @param {Object} object1
 * @param {Object} object2
 * @param {string} key
 * @returns {boolean}
 */
const haveSameKeyDiffVal = (obj1, obj2, key) => {
  const haveSameKey = _.has(obj1, key) && _.has(obj2, key);
  return haveSameKey && obj2[key] !== obj1[key];
};

/**
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {string} key
 * @returns {boolean}
 */
const haveNestedValues = (obj1, obj2, key) => isObject(obj1[key]) && isObject(obj2[key]);

/**
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {string} key
 * @returns {string}
 */
const getNodeType = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return 'added';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (haveSameKeyDiffVal(obj1, obj2, key) && !haveNestedValues(obj1, obj2, key)) {
    return 'updated';
  }
  return '';
};

/**
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Array}
 */
const buildAST = (obj1, obj2) => {
  const mergedKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = _.sortBy([...mergedKeys], (key) => key).map((key) => {
    const type = getNodeType(obj1, obj2, key);

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        values: [],
        children: buildAST(obj1[key], obj2[key]),
        type,
      };
    }

    if (type === 'added') {
      return {
        key,
        values: [obj2[key]],
        type,
      };
    }
    if (type === 'removed') {
      return {
        key,
        values: [obj1[key]],
        type,
      };
    }
    if (type === 'updated') {
      return {
        key,
        values: [obj1[key], obj2[key]],
        type,
      };
    }
    return {
      key,
      values: [obj1[key]],
      type,
    };
  });
  return result;
};
export default buildAST;

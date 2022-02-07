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
 * @returns {Array}
 */
const compareObjects = (obj1, obj2) => {
  const mergedKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = _.sortBy([...mergedKeys], (key) => key).map((key) => {
    const added = !_.has(obj1, key);
    const removed = !_.has(obj2, key);
    const updated = haveSameKeyDiffVal(obj1, obj2, key) && !haveNestedValues(obj1, obj2, key);

    const meta = {
      added,
      removed,
      updated,
    };

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        values: [],
        children: compareObjects(obj1[key], obj2[key]),
        meta,
      };
    }

    if (added) {
      return {
        key,
        values: [obj2[key]],
        meta,
      };
    }
    if (removed) {
      return {
        key,
        values: [obj1[key]],
        meta,
      };
    }
    if (updated) {
      return {
        key,
        values: [obj1[key], obj2[key]],
        meta,
      };
    }
    return {
      key,
      values: [obj1[key]],
      meta,
    };
  });
  return result;
};
export default compareObjects;

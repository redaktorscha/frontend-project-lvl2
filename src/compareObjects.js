import _ from 'lodash';
import { isObject } from './utils.js';

/**
 * @param {Object} object1
 * @param {Object} object2
 * @param {string} key
 * @returns {boolean}
 */
const haveSameKeyButDifferentValue = (object1, object2, key) =>
  _.has(object1, key) && _.has(object2, key) && object2[key] !== object1[key];

/**
 * @param {Object} object1
 * @param {Object} object2
 * @param {string} key
 * @returns {boolean}
 */
const haveBothNestedValues = (object1, object2, key) => isObject(object1[key]) && isObject(object2[key]);
/**
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Array}
 */
const compareObjects = (obj1, obj2) => {
  const mergedKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = _.sortBy([...mergedKeys], (key) => key).map((key) => {
    const wasAdded = !_.has(obj1, key);
    const wasRemoved = !_.has(obj2, key);
    const wasUpdated = haveSameKeyButDifferentValue(obj1, obj2, key) && !haveBothNestedValues(obj1, obj2, key);

    const meta = { wasAdded, wasRemoved, wasUpdated };

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        values: [],
        children: compareObjects(obj1[key], obj2[key]),
        meta,
      };
    }

    if (wasAdded) {
      return { key, values: [obj2[key]], meta };
    }
    if (wasRemoved) {
      return { key, values: [obj1[key]], meta };
    }
    if (wasUpdated) {
      return { key, values: [obj1[key], obj2[key]], meta };
    }
    return { key, values: [obj1[key]], meta };
  });
  return result;
};
export default compareObjects;

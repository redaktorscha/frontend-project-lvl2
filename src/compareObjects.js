import _ from 'lodash';
import { isObject } from './utils.js';
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
    const wasUpdated =
      _.has(obj2, key) && _.has(obj1, key) && obj2[key] !== obj1[key] && !(isObject(obj1[key]) && isObject(obj2[key]));
    let isNested;
    const meta = { wasAdded, wasRemoved, wasUpdated, isNested };

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      meta.isNested = true;
      return { key, values: compareObjects(obj1[key], obj2[key]), meta }; // [{ key, values[], meta }];
    }
    meta.isNested = false;
    let values;

    if (wasAdded) {
      values = [obj2[key]];
    } else if (wasRemoved) {
      values = [obj1[key]];
    } else if (wasUpdated) {
      values = [obj1[key], obj2[key]];
    } else {
      values = [obj1[key]];
    }
    return { key, values, meta };
  });
  return result;
};
export default compareObjects;

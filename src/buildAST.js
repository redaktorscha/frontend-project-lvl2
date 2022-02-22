import _ from 'lodash';
import { isObject } from './utils.js';

/**
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Array}
 */
const buildAST = (obj1, obj2) => {
  const mergedKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const result = _.sortBy([...mergedKeys], (key) => key).map((key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        children: buildAST(obj1[key], obj2[key]),
        type: 'nested',
      };
    }

    if (!_.has(obj1, key)) {
      return {
        key,
        value1: obj2[key],
        type: 'added',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        value1: obj1[key],
        type: 'removed',
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'updated',
      };
    }
    return {
      key,
      value1: obj1[key],
      type: 'unchanged',
    };
  });
  return result;
};
export default buildAST;

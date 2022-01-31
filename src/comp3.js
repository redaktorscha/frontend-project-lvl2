import _ from 'lodash';
import getParsedObject from './parsers.js';

const ob1 = getParsedObject('./__fixtures__/file1.json');
const ob2 = getParsedObject('./__fixtures__/file2.json');

/**
 * @param {number} tabSize
 * @returns {string}
 */
const makeTab = (tabSize) => ' '.repeat(tabSize);

/**
 * @param {*} obj
 * @returns {boolean}
 */
const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

/**
 * @param {*} obj
 * @param {number} indent
 * @returns {string}
 */
const logObjProps = (obj, indent) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return `${makeTab(indent)}+ ${key}: {\n${logObjProps(obj[key], indent + 2)}\n${makeTab(indent)}}`;
    }
    return `${makeTab(indent)}+ ${key}: ${obj[key]}`;
  });
  return `${result.join('\n')}`;
};

/**
 * @param {Object} object1
 * @param {Object} object2
 * @returns {string}
 */
const diff = (object1, object2) => {
  const indent = 4;
  /**
   * @param {Object} obj1
   * @param {Object} obj2
   * @param {number} depth
   * @returns
   */
  const recDiff = (obj1, obj2, depth) => {
    const mergedKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    const result = _.sortBy([...mergedKeys], (key) => key).map((key) => {
      const wasAdded = !_.has(obj1, key);
      const wasRemoved = !_.has(obj2, key);
      const wasChanged = _.has(obj2, key) && obj2[key] !== obj1[key];

      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return `${makeTab(depth)}${key}: {\n${recDiff(obj1[key], obj2[key], depth + 2)}\n${makeTab(depth)}}`;
      }

      const objValue1 = isObject(obj1[key]) ? `{\n${logObjProps(obj1[key], depth + 2)}\n${makeTab(depth)}}` : obj1[key];
      const objValue2 = isObject(obj2[key]) ? `{\n${logObjProps(obj2[key], depth + 2)}\n${makeTab(depth)}}` : obj2[key];

      if (wasAdded) {
        return `${makeTab(depth)}+ ${key}: ${objValue2}`;
      }
      if (wasRemoved) {
        return `${makeTab(depth)}- ${key}: ${objValue1}`;
      }
      if (wasChanged) {
        return `${makeTab(depth)}- ${key}: ${objValue1}\n${makeTab(depth)}+ ${key}: ${objValue2}`;
      }
      return `${makeTab(depth)}  ${key}: ${objValue1}`;
    });
    return `${result.join('\n')}`;
  };
  return `{\n${recDiff(object1, object2, indent)}\n}`;
};
console.log(diff(ob1, ob2));

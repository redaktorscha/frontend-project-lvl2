import _ from 'lodash';

const indent = 4;
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
 * @param {number} depth
 * @returns {string}
 */
const logObjProps = (obj, depth) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return `${makeTab(depth)}${key}: {\n${logObjProps(obj[key], depth + indent)}\n${makeTab(depth)}}`;
    }
    return `${makeTab(depth)}${key}: ${obj[key]}`;
  });
  return `${result.join('\n')}`;
};

/**
 * @param {Object} object1
 * @param {Object} object2
 * @returns {string}
 */
const compareObjects = (object1, object2) => {
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
      const wasUpdated = _.has(obj2, key) && obj2[key] !== obj1[key];

      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return `${makeTab(depth)}${key}: {\n${recDiff(obj1[key], obj2[key], depth + indent)}\n${makeTab(depth)}}`; // formatter
      }

      const objValue1 = isObject(obj1[key])
        ? `{\n${logObjProps(obj1[key], depth + indent)}\n${makeTab(depth)}}` // formatter
        : obj1[key];
      const objValue2 = isObject(obj2[key])
        ? `{\n${logObjProps(obj2[key], depth + indent)}\n${makeTab(depth)}}` // formatter
        : obj2[key];

      if (wasAdded) {
        return `${makeTab(depth - 2)}+ ${key}: ${objValue2}`; // formatter
      }
      if (wasRemoved) {
        return `${makeTab(depth - 2)}- ${key}: ${objValue1}`; // formatter
      }
      if (wasUpdated) {
        return `${makeTab(depth - 2)}- ${key}: ${objValue1}\n${makeTab(depth - 2)}+ ${key}: ${objValue2}`; // formatter
      }
      return `${makeTab(depth)}${key}: ${objValue1}`; // formatter
    });
    return `${result.join('\n')}`; // formatter
  };
  return `{\n${recDiff(object1, object2, indent)}\n}`;
};
export default compareObjects;

import _ from 'lodash';

/**
 *
 * @param {Array} elem
 * @param {Object} object1
 * @param {Object} object2
 * @returns {string}
 */
export const compare = (elem, object1, object2) => {
  const [key, value] = elem;

  if (!_.has(object2, key)) {
    return `- ${key}: ${value}`;
  }

  if (!_.has(object1, key)) {
    return `+ ${key}: ${value}`;
  }

  if (_.has(object2, key) && object2[key] !== value) {
    return [`- ${key}: ${value}`, `+ ${key}: ${object2[key]}`].join('\n');
  }
  return `  ${key}: ${value}`;
};

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {string}
 */
export const compareObjects = (obj1, obj2) => {
  const mergedData = { ...obj2, ...obj1 };
  const sorted = _.sortBy(Object.entries(mergedData), ([key]) => key);
  const diffArr = sorted
    .map((el) => compare(el, obj1, obj2));
  return `{\n${diffArr.join('\n')}\n}`;
};

import _ from 'lodash';

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {string}
 */
const compareObjects = (obj1, obj2) => {
  const mergedData = { ...obj2, ...obj1 };
  const sorted = _.sortBy(Object.entries(mergedData), ([key]) => key);
  const diffArr = sorted
    .map((el) => {
      const [key, value] = el;

      if (!_.has(obj2, key)) {
        return `- ${key}: ${value}`;
      }

      if (!_.has(obj1, key)) {
        return `+ ${key}: ${value}`;
      }

      if (_.has(obj2, key) && obj2[key] !== value) {
        return [`- ${key}: ${value}`, `+ ${key}: ${obj2[key]}`].join('\n');
      }
      return `  ${key}: ${value}`;
    });
  const strResult = `{\n${diffArr.join('\n')}\n}`;
  return strResult;
};

export default compareObjects;

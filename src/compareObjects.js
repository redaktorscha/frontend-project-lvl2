import _ from 'lodash';

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {string}
 */
const compareObjects = (obj1, obj2) => {
  const mergedData = { ...obj2, ...obj1 };
  // console.log('merged', mergedData);
  const sorted = _.sortBy(Object.entries(mergedData), ([key]) => key);
  // console.log('sorted', sorted);
  const diffArr = sorted
    .map((el) => {
      // const diffResult = {
      //   data: el,
      //   removed: false,
      //   added: false,
      //   changed: false,
      // };

      const [key, value] = el;

      if (!_.has(obj2, key)) {
        return `- ${key}: ${value}`;
        // diffResult.removed = true;
      }

      if (!_.has(obj1, key)) {
        // diffResult.added = true;
        return `+ ${key}: ${value}`;
      }

      if (_.has(obj2, key) && obj2[key] !== value) {
        // diffResult.changed = true;
        // diffResult.newData = { key: obj2[key] };
        return [`- ${key}: ${value}`, `+ ${key}: ${obj2[key]}`].join('\n');
      }
      return `  ${key}: ${value}`;
    });
  // console.log(obj1);
  // console.log(typeof obj2);
  const strResult = `{\n${diffArr.join('\n')}\n}`;
  return strResult;
};

export default compareObjects;

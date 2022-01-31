import _ from 'lodash';
import getParsedObject from './parsers.js';

const ob1 = getParsedObject('./__fixtures__/file1.json');
const ob2 = getParsedObject('./__fixtures__/file2.json');
const indent = 4;

const makeTab = (tabSize) => ' '.repeat(tabSize);

const logObjProps = (obj) => {
  const log = (ob, depth) => {
    const result = Object.keys(ob).map((key) => {
      if (_.isObject(ob[key]) && !_.isArray(ob[key])) {
        // console.log(key, depth);
        return `${makeTab(depth)}+ ${key}: {\n${log(ob[key], depth + 2)}\n${makeTab(depth)}}`;
      }
      return `${makeTab(depth)}+ ${key}: ${ob[key]}`;
    });
    return `${result.join('\n')}`;
  };

  return `{\n${log(obj, indent)}\n}`;
};

console.log(logObjProps(ob1));

//

const compare = (key, object1, object2) => {
  if (!_.has(object2, key)) {
    return ['- ', `${key}: ${object1[key]}`];
  }

  if (!_.has(object1, key)) {
    return ['+ ', `${key}: ${object2[key]}`];
  }

  if (_.has(object2, key) && object2[key] !== object1[key]) {
    return ['- ', `${key}: ${object1[key]}`, '\n', '+ ', `${key}: ${object2[key]}`];
  }
  return ['  ', `${key}: ${object1[key]}`];
};

const compareObjects = (obj1, obj2) => {
  const mergedData = {
    ...obj2,
    ...obj1,
  };

  const diff = (object) => {
    const recDiff = (obj, depth) => {
      const result = _.sortBy(Object.keys(obj), (key) => key).map((key) => {
        if (_.isObject(obj[key]) && !_.isArray(obj[key])) {
          return `${makeTab(depth)}+ ${key}: {\n${recDiff(obj[key], depth + 2)}\n${makeTab(depth)}}`;
        }
        return `${makeTab(depth)}+ ${key}: ${obj[key]}`;
      });
      return `${result.join('\n')}`;
    };
    return `{\n${recDiff(object, indent)}\n}`;
  };

  return diff(mergedData);
};
// compareObjects(ob1, ob2);
// console.log(compareObjects(ob1, ob2));

import _ from 'lodash';

// flatMap

const obj1 = JSON.parse(`{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}`);

const obj2 = JSON.parse(`{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}`);

const keysAddedObj2 = Object.keys(obj2)
  .filter((key) => !_.has(obj1, key))
  .map((key) => ['+ ', `${key}: ${obj2[key]}`]);

const keysObj1 = Object.keys(obj1).map((key) => {
  if (!_.has(obj2, key)) {
    return ['- ', `${key}: ${obj1[key]}`];
  }
  if (obj2[key] !== obj1[key]) {
    return ['- ', `${key}: ${obj1[key]}`, '\n', '+ ', `${key}: ${obj2[key]}`];
  }
  return ['  ', `${key}: ${obj1[key]}`];
});

const keyIndex = 1;

const diffResult = _.sortBy([...keysObj1, ...keysAddedObj2], (elem) => elem[keyIndex])
  .map((el) => el.join(''))
  .join('\n');

console.log(`{\n${diffResult}\n}`);

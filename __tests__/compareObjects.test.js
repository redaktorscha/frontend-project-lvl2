import { it, expect } from '@jest/globals';
import { getFixturePath, readFile } from '../src/utils.js';
import compareObjects from '../src/compareObjects.js';
import diffArr from '../__fixtures__/fixtureArr.js';

it('should return diff array if 2 obj given', () => {
  const obj1 = JSON.parse(readFile('file1.json', getFixturePath));
  const obj2 = JSON.parse(readFile('file2.json', getFixturePath));
  const result = compareObjects(obj1, obj2);
  expect(result).toEqual(diffArr);
});

import { it, expect } from '@jest/globals';
import { getFixturePath, readFile } from '../src/utils.js';
import compareObjects from '../src/compareObjects.js';

it('should return diff string if 2 obj given', () => {
  const obj1 = JSON.parse(readFile('file1.json', getFixturePath));
  const obj2 = JSON.parse(readFile('file2.json', getFixturePath));
  const fixtureStr = readFile('diff', getFixturePath);
  const result = compareObjects(obj1, obj2);
  expect(result).toBe(fixtureStr);
});

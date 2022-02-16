import { test, expect, describe } from '@jest/globals';

import { getFixturePath, readFile } from '../src/utils.js';
import genDiff from '../src/genDiff.js';

describe('working with built-in formatters', () => {
  const fixtureStringStylish = readFile('diffStylish', getFixturePath).trim();
  const fixtureStringPlain = readFile('diffPlain', getFixturePath).trim();
  const fixtureStringJson = readFile('diffJson', getFixturePath).trim();

  test.each(['yaml', 'json'])(
    'should return a diff str when comparing %s',
    (fileFormat) => {
      const file1 = `file1.${fileFormat}`;
      const file2 = `file2.${fileFormat}`;
      expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish')).toEqual(
        fixtureStringStylish,
      );
      expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain')).toEqual(
        fixtureStringPlain,
      );
      expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json')).toEqual(
        fixtureStringJson,
      );
    },
  );
});

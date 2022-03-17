import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @param {string} filename
 * @returns {string}
 */
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

/**
 * @param {string} file
 * @returns {string}
 */
const readFixture = (file) => readFileSync(getFixturePath(file), 'utf-8').trim();

describe('working with built-in formatters', () => {
  const fixtureStringStylish = readFixture('diffStylish');
  const fixtureStringPlain = readFixture('diffPlain');
  const fixtureStringJson = readFixture('diffJson');

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

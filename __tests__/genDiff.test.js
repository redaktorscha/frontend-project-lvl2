import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @param {string} file
 * @param {Function} fn
 * @returns {string}
 */
const readFile = (file, fn) => readFileSync(fn(file), 'utf-8');

/**
 * @param {string} filename
 * @returns {string}
 */
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

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

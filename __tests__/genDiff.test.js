// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import {
  it, test, expect, describe,
} from '@jest/globals';
import { getFixturePath, readFile } from '../src/utils.js';
import genDiff from '../genDiff.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

it('returns diff string', () => {
  const fixtureStr = readFile('diff');
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toBe(fixtureStr);
});

describe('genDiff errors', () => {
  test('wrong filepath', () => {
    const noEntWarning = 'NOENT: no such file or directory';
    const result = genDiff(getFixturePath('fff.json'), getFixturePath('file2.json'));
    expect(result).toEqual(expect.stringContaining(noEntWarning));
  });

  test('one filepath missing', () => {
    expect(genDiff(getFixturePath('fff.json'))).toBe('Missing required argument(s) <filepath1> <filepath2>');
  });

  test('both arguments missing', () => {
    expect(genDiff()).toBe('Missing required argument(s) <filepath1> <filepath2>');
  });
});

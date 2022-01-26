// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import {
  it, expect,
} from '@jest/globals';
import { readFile } from '../src/utils.js';
import { compareObjects } from '../src/compareObjects.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

it('should return diff string if 2 obj given', () => {
  const obj1 = JSON.parse(readFile('file1.json'));
  const obj2 = JSON.parse(readFile('file2.json'));
  const fixtureStr = readFile('diff');
  const result = compareObjects(obj1, obj2);
  expect(result).toBe(fixtureStr);
});

// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import {
  test, expect, beforeAll,
} from '@jest/globals';
import { readFile } from '../src/utils.js';
import { compare } from '../src/compareObjects.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let obj1;
let obj2;

beforeAll(() => {
  obj1 = JSON.parse(readFile('file1.json'));
  obj2 = JSON.parse(readFile('file2.json'));
});

test('prop removed from 2nd obj', () => {
  const result = compare(['proxy', '123.234.53.22'], obj1, obj2);
  expect(result).toBe('- proxy: 123.234.53.22');
});

test('prop added to 2nd obj', () => {
  const result = compare(['verbose', true], obj1, obj2);
  expect(result).toBe('+ verbose: true');
});

test('prop changed', () => {
  const result = compare(['timeout', 50], obj1, obj2);
  expect(result).toBe('- timeout: 50\n+ timeout: 20');
});

test('prop not changed', () => {
  const result = compare(['host', 'hexlet.io'], obj1, obj2);
  expect(result).toBe('  host: hexlet.io');
});

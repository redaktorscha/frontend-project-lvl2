// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { getFixturePath } from '../src/utils.js';
import getParsedObject from '../src/getParsedObject.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

it('should return parsed object', () => {
  const fixtureObj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const parsedObj = getParsedObject(getFixturePath('file1.json'));
  expect(parsedObj).toEqual(fixtureObj);
});

test('should throw error', () => {
  expect(() => {
    getParsedObject(getFixturePath('file3.json'));
  }).toThrow();
});

// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import { getFixturePath } from '../src/utils.js';
import getParsedObject from '../src/parsers.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('basic functionality', () => {
  let fixtureObj;

  beforeAll(() => {
    fixtureObj = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: {
          key: 'value',
        },
      },
      group2: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    };
  });

  it('should return parsed json', () => {
    const parsedObj = getParsedObject(getFixturePath('file1.json'));
    expect(parsedObj).toEqual(fixtureObj);
  });

  it('should return parsed yaml', () => {
    const parsedObj = getParsedObject(getFixturePath('file1.yml'));
    expect(parsedObj).toEqual(fixtureObj);
  });
});

describe('error handling', () => {
  test('should throw error if wrong filepath', () => {
    expect(() => {
      getParsedObject(getFixturePath('file3.json'));
    }).toThrow();
  });

  test('should throw error if bad json', () => {
    expect(() => {
      getParsedObject(getFixturePath('bad1.json'));
    }).toThrow();
  });

  test('should throw error if bad yaml', () => {
    expect(() => {
      getParsedObject(getFixturePath('bad2.yml'));
    }).toThrow();
  });

  test('should throw error if wrong file format', () => {
    expect(() => {
      getParsedObject(getFixturePath('cat1.png'));
    }).toThrow();
  });
});

import { test, expect, describe } from '@jest/globals';
import { getFixturePath } from '../src/utils.js';
import getParsedObject from '../src/parsers.js';

describe('basic functionality', () => {
  const fixtureObj = {
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

  test.each([
    {
      fileName: 'file1.json',
      format: 'json',
      expectedResult: fixtureObj,
    },
    {
      fileName: 'file1.yaml',
      format: 'yaml',
      expectedResult: fixtureObj,
    },
  ])('should return parsed $format', ({ fileName, expectedResult }) => {
    expect(getParsedObject(getFixturePath(fileName))).toEqual(expectedResult);
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

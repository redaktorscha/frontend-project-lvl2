import { test, expect, describe } from '@jest/globals';

import { getFixturePath, readFile } from '../src/utils.js';
import genDiff from '../src/genDiff.js';

describe('working with built-in formatters', () => {
  const fixtureStringStylish = readFile('diffStylish', getFixturePath).trim();
  const fixtureStringPlain = readFile('diffPlain', getFixturePath).trim();
  const fixtureStringJson = readFile('diffJson', getFixturePath).trim();

  test.each([
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format1: 'json',
      format2: 'json',
      formatterName: 'stylish',
      expectedResult: fixtureStringStylish,
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format1: 'json',
      format2: 'json',
      formatterName: 'plain',
      expectedResult: fixtureStringPlain,
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format1: 'json',
      format2: 'json',
      formatterName: 'json',
      expectedResult: fixtureStringJson,
    },
    {
      fileName1: 'file1.yaml',
      fileName2: 'file2.yaml',
      format1: 'yaml',
      format2: 'yaml',
      formatterName: 'stylish',
      expectedResult: fixtureStringStylish,
    },
    {
      fileName1: 'file1.yaml',
      fileName2: 'file2.yaml',
      format1: 'yaml',
      format2: 'yaml',
      formatterName: 'plain',
      expectedResult: fixtureStringPlain,
    },
    {
      fileName1: 'file1.yaml',
      fileName2: 'file2.yaml',
      format1: 'yaml',
      format2: 'yaml',
      formatterName: 'json',
      expectedResult: fixtureStringJson,
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.yaml',
      format1: 'json',
      format2: 'yaml',
      formatterName: 'stylish',
      expectedResult: fixtureStringStylish,
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.yaml',
      format1: 'json',
      format2: 'yaml',
      formatterName: 'plain',
      expectedResult: fixtureStringPlain,
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.yaml',
      format1: 'json',
      format2: 'yaml',
      formatterName: 'json',
      expectedResult: fixtureStringJson,
    },
  ])(
    'should return a diff str when comparing $format1 with $format2 formatted with $formatterName',
    ({
      fileName1, fileName2, formatterName, expectedResult,
    }) => {
      expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), formatterName)).toEqual(
        expectedResult,
      );
    },
  );
});

describe('genDiff errors', () => {
  test('wrong filepath', () => {
    const noEntWarning = 'NOENT: no such file or directory';
    const result = genDiff(getFixturePath('fff.json'), getFixturePath('file2.json'));
    expect(result).toEqual(expect.stringContaining(noEntWarning));
  });

  test('one filepath missing', () => {
    expect(genDiff(getFixturePath('fff.json'))).toBe(
      'Missing required argument(s) <filepath1> <filepath2>',
    );
  });

  test('both arguments missing', () => {
    expect(genDiff()).toBe('Missing required argument(s) <filepath1> <filepath2>');
  });

  test('bad file', () => {
    const incorrectFileWarning = 'Incorrect YAML';
    const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('bad2.yml'));
    expect(result).toEqual(expect.stringContaining(incorrectFileWarning));
  });

  test('wrong file format', () => {
    const wrongFormatWarning = 'Wrong file format';
    const result = genDiff(getFixturePath('cat1.png'), getFixturePath('cat2.jpg'));
    expect(result).toEqual(expect.stringContaining(wrongFormatWarning));
  });
});

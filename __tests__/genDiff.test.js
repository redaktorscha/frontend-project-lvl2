import {
  it,
  test,
  expect,
  describe,
} from '@jest/globals';

import { getFixturePath, readFile } from '../src/utils.js';
import genDiff from '../genDiff.js';

describe('basic functionality', () => {
  let fixtureString;

  beforeAll(() => {
    fixtureString = readFile('diff', getFixturePath);
  });

  it('returns diff string when parsing JSON', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(result).toBe(fixtureString);
  });

  it('returns diff string when parsing YAML', () => {
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
    expect(result).toBe(fixtureString);
  });

  it('returns diff string when comparing JSON with YAML', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'));
    expect(result).toBe(fixtureString);
  });
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

  test('bad file', () => {
    const incorrectFileWarning = 'Incorrect file';
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('bad2.yml'));
    expect(result).toEqual(expect.stringContaining(incorrectFileWarning));
  });

  test('wrong file format', () => {
    const wrongFormatWarning = 'Wrong file format';
    const result = genDiff(getFixturePath('cat1.png'), getFixturePath('cat2.jpg'));
    expect(result).toEqual(expect.stringContaining(wrongFormatWarning));
  });
});

import { it, test, expect, describe } from '@jest/globals';

import { getFixturePath, readFile } from '../src/utils.js';
import genDiff from '../genDiff.js';

describe('basic functionality, default formatter (stylish)', () => {
  let fixtureStringStylish;

  beforeAll(() => {
    fixtureStringStylish = readFile('diffStylish', getFixturePath).trim();
  });

  it('returns diff string when comparing JSON to JSON', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(result).toBe(fixtureStringStylish);
  });

  it('returns diff string when comparing YAML to YAML', () => {
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
    expect(result).toBe(fixtureStringStylish);
  });

  it('returns diff string when comparing JSON to YAML', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'));
    expect(result).toBe(fixtureStringStylish);
  });
});

describe('basic functionality, formatter plain', () => {
  let fixtureStringPlain;

  beforeAll(() => {
    fixtureStringPlain = readFile('diffPlain', getFixturePath);
  });

  it('returns diff string when comparing JSON to JSON', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
    expect(result).toBe(fixtureStringPlain);
  });

  it('returns diff string when comparing YAML to YAML', () => {
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain');
    expect(result).toBe(fixtureStringPlain);
  });

  it('returns diff string when comparing JSON to YAML', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'plain');
    expect(result).toBe(fixtureStringPlain);
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

import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildAST from './buildAST.js';
import chooseFormatter from './formatters/index.js';

/**
 * @param {string} filepath
 * @returns {string}
 */
const readFile = (filepath) => readFileSync(path.resolve(filepath), 'utf-8');

/**
 * @param {string} filepath
 * @returns {string}
 */
const getFileFormat = (filepath) => path.extname(filepath).slice(1);
/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @param {string} formatterName
 * @returns {string}
 */
const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  const fileFormat1 = getFileFormat(filepath1);
  const fileFormat2 = getFileFormat(filepath2);

  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const data1 = parse(fileFormat1, fileContent1);
  const data2 = parse(fileFormat2, fileContent2);

  const formatOutput = chooseFormatter(formatterName);

  const internalTree = buildAST(data1, data2);

  return formatOutput(internalTree);
};

export default genDiff;

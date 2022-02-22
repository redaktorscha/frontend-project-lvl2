import getParsedData from './parsers.js';
import buildAST from './buildAST.js';
import chooseFormatter from './formatters/index.js';
/**
 * @param {string} filepath1
 * @param {string} filepath2
 * @param {string} formatterName
 * @returns {string}
 */
const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const formatter = chooseFormatter(formatterName);
  return formatter(buildAST(data1, data2));
};

export default genDiff;

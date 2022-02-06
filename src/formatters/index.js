import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

/**
 * @param {string} formatterName
 * @returns {Function|Error}
 */
const chooseFormatter = (formatterName) => {
  if (!Object.keys(formatters).includes(formatterName)) {
    throw new Error(`Formatter not supported: "${formatterName}"`);
  }
  return formatters[formatterName];
};

export default chooseFormatter;

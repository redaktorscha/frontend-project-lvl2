import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

/**
 * @param {string} formatterName
 * @returns {Function}
 */
const chooseFormatter = (formatterName) => {
  if (!Object.keys(formatters).includes(formatterName)) {
    throw new Error(`Formatter not supported: "${formatterName}"`);
  }
  return formatters[formatterName];
};

export default chooseFormatter;

import stylish from './stylish.js';
import plain from './plain.js';

const formatters = ['stylish', 'plain'];

/**
 * @param {string} formatterName
 * @returns {Function|Error}
 */
const chooseFormatter = (formatterName) => {
  if (!formatters.includes(formatterName)) {
    throw new Error(`Formatter not supported: "${formatterName}"`);
  }
  let formatter;
  if (formatterName === 'stylish') {
    formatter = stylish;
  }
  if (formatterName === 'plain') {
    formatter = plain;
  }
  return formatter;
};

export default chooseFormatter;

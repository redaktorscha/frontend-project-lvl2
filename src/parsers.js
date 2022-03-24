import YAML from 'yaml';

/**
 * @param {string} format
 * @param {string} content
 * @returns {Object}
 */
const parse = (format, content) => {
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yml' || format === 'yaml') {
    return YAML.parse(content);
  }
  throw new Error('Wrong file format');
};

export default parse;

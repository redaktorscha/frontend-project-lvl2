import _ from 'lodash';

const baseIndent = 4;

const tagSize = 2;

/**
 * @param {Array} ast
 * @returns {string | Error}
 */
const stylish = (ast) => {
  /**
   * @param {Object} nodes
   * @param {number} depth
   * @returns {string}
   */
  const iter = (nodes, depth) => {
    /**
     * @param {number} level
     * @param {boolean} [hasTag = false]
     * @returns {string | Error}
     */
    const indent = (level, hasTag = false) => {
      const currentIndent = baseIndent * level;
      if (hasTag) {
        return ' '.repeat(currentIndent - tagSize);
      }
      return ' '.repeat(currentIndent);
    };

    /**
     * @param {*} value
     * @param {number} innerDepth
     * @returns {string}
     */
    const stringify = (value, innerDepth) => {
      /**
       * @param {Object} obj
       * @param {number} innerLevel
       * @returns {string}
       */
      const inner = (obj, innerLevel) => Object.keys(obj).map((key) => {
        if (_.isPlainObject(obj[key])) {
          // eslint-disable-next-line max-len
          return `${indent(innerLevel)}${key}: {\n${inner(obj[key], innerLevel + 1)}\n${indent(innerLevel)}}`;
        }
        return `${indent(innerLevel)}${key}: ${obj[key]}`;
      }).join('\n');

      if (!_.isPlainObject(value)) {
        return String(value);
      }

      const result = inner(value, innerDepth + 1);
      return `{\n${result}\n${indent(innerDepth)}}`;
    };

    const result = nodes.map((elem) => {
      const {
        key,
        type,
      } = elem;

      switch (type) {
        case 'nested':
          return `${indent(depth)}${key}: {\n${iter(elem.children, depth + 1)}\n${indent(depth)}}`;

        case 'added':
          return `${indent(depth, true)}+ ${key}: ${stringify(elem.value, depth)}`;

        case 'removed':
          return `${indent(depth, true)}- ${key}: ${stringify(elem.value, depth)}`;

        case 'updated':
          return `${indent(depth, true)}- ${key}: ${stringify(elem.value1, depth)}\n`
          + `${indent(depth, true)}+ ${key}: ${stringify(elem.value2, depth)}`;

        case 'unchanged':
          return `${indent(depth)}${key}: ${stringify(elem.value, depth)}`;

        default:
          throw new Error('unknown node type');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(ast, 1)}\n}`;
};
export default stylish;

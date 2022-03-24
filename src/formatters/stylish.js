import _ from 'lodash';

const baseIndent = 4;

const tagSize = 2;

/**
     * @param {number} level
     * @param {boolean} [hasTag = false]
     * @returns {string}
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
  const inner = (obj, innerLevel) => Object.keys(obj)
    .map((key) => {
      if (_.isPlainObject(obj[key])) {
        return [
          `${indent(innerLevel)}${key}: {`,
          `${inner(obj[key], innerLevel + 1)}`,
          `${indent(innerLevel)}}`]
          .join('\n');
      }
      return `${indent(innerLevel)}${key}: ${obj[key]}`;
    })
    .join('\n');

  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const result = inner(value, innerDepth + 1);
  return `{\n${result}\n${indent(innerDepth)}}`;
};

/**
 * @param {Array.<Object>} ast
 * @returns {string}
 */
const stylish = (ast) => {
  /**
   * @param {Array.<Object>} nodes
   * @param {number} depth
   * @returns {string}
   */
  const iter = (nodes, depth) => {
    const result = nodes.map((/** @type {Object} */ node) => {
      const {
        key,
        type,
      } = node;

      switch (type) {
        case 'nested':
          return `${indent(depth)}${key}: {\n${iter(node.children, depth + 1)}\n${indent(depth)}}`;

        case 'added':
          return `${indent(depth, true)}+ ${key}: ${stringify(node.value, depth)}`;

        case 'removed':
          return `${indent(depth, true)}- ${key}: ${stringify(node.value, depth)}`;

        case 'updated':
          return `${indent(depth, true)}- ${key}: ${stringify(node.value1, depth)}\n`
          + `${indent(depth, true)}+ ${key}: ${stringify(node.value2, depth)}`;

        case 'unchanged':
          return `${indent(depth)}${key}: ${stringify(node.value, depth)}`;

        default:
          throw new Error('unknown node type');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(ast, 1)}\n}`;
};
export default stylish;

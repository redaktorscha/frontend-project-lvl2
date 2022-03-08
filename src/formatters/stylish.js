import _ from 'lodash';

const baseIndent = 4;

const tagSize = 2;

/**
 * @param {Array} AST
 * @returns {string}
 */
const stylish = (AST) => {
  /**
   * @param {Object} arr
   * @param {number} depth
   * @returns {string}
   */
  const diffOutput = (arr, depth) => {
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
      const recursiveStringify = (obj, innerLevel) => Object.keys(obj).map((key) => {
        if (_.isPlainObject(obj[key])) {
          return [
            indent(innerLevel),
            `${key}: {\n`,
            recursiveStringify(obj[key], innerLevel + 1),
            `\n${indent(innerLevel)}}`,
          ].join('');
        }
        return `${indent(innerLevel)}${key}: ${obj[key]}`;
      }).join('\n');

      if (!_.isPlainObject(value)) {
        return String(value);
      }

      const result = recursiveStringify(value, innerDepth + 1);
      return `{\n${result}\n${indent(innerDepth)}}`;
    };

    const result = arr.map((elem) => {
      const {
        key,
        type,
      } = elem;

      switch (type) {
        case 'nested':
          return [
            indent(depth),
            `${key}: {\n`,
            diffOutput(elem.children, depth + 1),
            `\n${indent(depth)}}`,
          ].join('');

        case 'added':
          return [
            indent(depth, true),
            '+ ',
            `${key}: `,
            `${stringify(elem.value, depth)}`,
          ].join('');

        case 'removed':
          return [
            indent(depth, true),
            '- ',
            `${key}: `,
            `${stringify(elem.value, depth)}`,
          ].join('');

        case 'updated':
          return [
            indent(depth, true),
            '- ',
            `${key}: `,
            `${stringify(elem.value1, depth)}\n`,
            indent(depth, true),
            '+ ',
            `${key}: `,
            `${stringify(elem.value2, depth)}`,
          ].join('');

        default:
          return `${indent(depth)}${key}: ${stringify(elem.value, depth)}`;
      }
    });
    return result.join('\n');
  };
  return `{\n${diffOutput(AST, 1)}\n}`;
};
export default stylish;

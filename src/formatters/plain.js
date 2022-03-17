/**
 * @param {*} value
 * @returns {string | null}
 */
const stringify = (value) => {
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

/**
 * @param {Array} ast
 * @returns {string | Error}
 */
const plain = (ast) => {
  /**
   * @param {Array} nodes
   * @param {Array} accumulator
   * @param {number} depth
   * @returns {string | Error}
   */
  const iter = (nodes, accumulator, depth) => {
    const result = nodes.map((elem) => {
      const {
        key,
        type,
      } = elem;

      const propertyName = depth > 1 ? `'${[...accumulator, key].join('.')}'` : `'${key}'`;

      switch (type) {
        case 'nested':
          return iter(elem.children, [...accumulator, key], depth + 1);

        case 'added':
          return `Property ${propertyName} was added with value: ${stringify(elem.value)}`;

        case 'removed':
          return `Property ${propertyName} was removed`;

        case 'updated':
          // eslint-disable-next-line max-len
          return `Property ${propertyName} was updated. From ${stringify(elem.value1)} to ${stringify(elem.value2)}`;

        case 'unchanged':
          return null;

        default:
          throw new Error('unknown node type');
      }
    });
    const filtered = result.filter((el) => el !== null);
    return filtered.join('\n');
  };

  return iter(ast, [], 1);
};
export default plain;

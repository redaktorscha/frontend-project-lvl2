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
   * @param {Array} propertyPath
   * @param {number} depth
   * @returns {string | Error}
   */
  const iter = (nodes, propertyPath, depth) => {
    const result = nodes.map((node) => {
      const {
        key,
        type,
      } = node;

      const propertyName = depth > 1 ? `'${[...propertyPath, key].join('.')}'` : `'${key}'`;

      switch (type) {
        case 'nested':
          return iter(node.children, [...propertyPath, key], depth + 1);

        case 'added':
          return `Property ${propertyName} was added with value: ${stringify(node.value)}`;

        case 'removed':
          return `Property ${propertyName} was removed`;

        case 'updated':
          return [`Property ${propertyName} was updated.`,
            `From ${stringify(node.value1)} to ${stringify(node.value2)}`]
            .join(' ');

        case 'unchanged':
          return null;

        default:
          throw new Error('unknown node type');
      }
    });
    const filtered = result.filter((node) => node !== null);
    return filtered.join('\n');
  };

  return iter(ast, [], 1);
};
export default plain;

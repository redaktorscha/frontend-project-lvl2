/**
 * @param {*} value
 * @returns {string}
 */
const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

/**
 * @param {Array} AST
 * @returns {string}
 */
const plain = (AST) => {
  /**
   * @param {Array} arr
   * @param {Array} accumulator
   * @param {number} depth
   * @returns {string}
   */
  const diffOutput = (arr, accumulator, depth) => {
    const result = arr.map((elem) => {
      const {
        key,
        type,
      } = elem;

      const accumKey = depth > 1 ? `'${[...accumulator, key].join('.')}'` : `'${key}'`;

      switch (type) {
        case 'nested':
          return diffOutput(elem.children, [...accumulator, key], depth + 1);

        case 'added':
          return [
            'Property ',
            accumKey,
            ' was added with value: ',
            stringify(elem.value),
          ].join('');

        case 'removed':
          return `Property ${accumKey} was removed`;

        case 'updated':
          return [
            'Property ',
            accumKey,
            ' was updated. From ',
            stringify(elem.value1),
            ' to ',
            stringify(elem.value2),
          ].join('');

        default:
          return null;
      }
    });
    const filtered = result.filter((el) => el !== null);
    return filtered.join('\n');
  };

  return diffOutput(AST, [], 1);
};
export default plain;

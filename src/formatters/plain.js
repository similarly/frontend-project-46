import _ from 'lodash';

function formatToPlain(tree) {
  const plainToString = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    if (_.isPlainObject(value)) {
      return '[complex value]';
    }
    return value;
  };

  const iter = (node, path = '') => {
    // Concat path
    const totalPath = path.concat(node.key);
    switch (node.type) {
      case 'added':
        return `Property '${totalPath}' was added with value: ${plainToString(node.value)}\n`;
      case 'updated':
        return `Property '${totalPath}' was updated. From ${plainToString(node.oldValue)} to ${plainToString(node.value)}\n`;
      case 'removed':
        return `Property '${totalPath}' was removed\n`;
      // Updated object to object
      case 'updated object':
        return node.children.filter((nd) => nd.type !== 'none').map(((child) => iter(child, totalPath.concat('.')))).join('');
      // Root node
      default:
        return node.children.filter((nd) => nd.type !== 'none').map(((child) => iter(child))).join('').trim();
    }
  };

  return iter(tree);
}

export default formatToPlain;

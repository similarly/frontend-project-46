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
      case 'root':
        return node.children.map(((child) => iter(child))).join('').trim();
      case 'added':
        return `Property '${totalPath}' was added with value: ${plainToString(node.value)}\n`;
      case 'updated':
        return `Property '${totalPath}' was updated. From ${plainToString(node.oldValue)} to ${plainToString(node.value)}\n`;
      case 'removed':
        return `Property '${totalPath}' was removed\n`;
      case 'updated object':
        return node.children.map(((child) => iter(child, totalPath.concat('.')))).join('');
      case 'none':
        return '';
      default:
        return 'Wrong property change specified.';
    }
  };

  return iter(tree);
}

export default formatToPlain;

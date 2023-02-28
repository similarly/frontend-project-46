import _ from 'lodash';

// Turn property value to string ()
function toString(object, level) {
  if (_.isPlainObject(object)) {
    const tab = ' '.repeat(4 * level - 2);
    const braceTab = ' '.repeat(4 * (level - 1));
    const children = Object.entries(object).map(([key, value]) => `${tab}  ${key}: ${toString(value, level + 1)}\n`);
    // Sort by key
    const sortedChildren = _.sortBy(children, (string) => string.split(':')[0].trim());
    return `{\n${sortedChildren.join('')}${braceTab}}`;
  }
  return object;
}
// Pass in root node:
function formatToStylish(tree) {
  const iter = (node, level) => {
    const tab = ' '.repeat(4 * level - 2);
    const braceTab = ' '.repeat(4 * level);
    switch (node.type) {
      case 'added':
        return `\n${tab}+ ${node.key}: ${toString(node.value, level + 1)}`;
      case 'updated':
        return `\n${tab}- ${node.key}: ${toString(node.oldValue, level + 1)}\n${tab}+ ${node.key}: ${toString(node.value, level + 1)}`;
      case 'removed':
        return `\n${tab}- ${node.key}: ${toString(node.value, level + 1)}`;
      case 'none':
        return `\n${tab}  ${node.key}: ${toString(node.value, level + 1)}`;
      // Updated object to object
      case 'updated object':
        return `\n${tab}  ${node.key}: {${node.children.map((child) => iter(child, level + 1)).join('')}\n${braceTab}}`;
      // Root node
      default:
        return `{${node.children.map((child) => iter(child, 1)).join('')}\n}`;
    }
  };
  return iter(tree, 1);
}

export default formatToStylish;

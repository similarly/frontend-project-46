import _ from 'lodash';

const isObject = (val) => (_.isObject(val) && !_.isArray(val));
const tabBase = '    ';

// Turn property value to string ()
function toString(object, level) {
  if (isObject(object)) {
    const tab = tabBase.repeat(level - 1);
    const braceTab = (level > 1) ? tabBase.repeat(level - 2).concat('  ') : tab.concat('  ');
    const children = Object.entries(object).map(([key, value]) => `${tab}  ${key}: ${toString(value, level + 1)}`);
    // Sort by key
    const sortedChildren = _.sortBy(children, (string) => string.split(':')[0].trim());
    return `{\n${sortedChildren.join('\n')}\n${braceTab}}`;
  }
  return object;
}
// Pass in root node:
function formatToStylish(tree) {
  const iter = (node, level) => {
    const tab = tabBase.repeat(level - 1);
    const braceTab = (level > 1) ? tabBase.repeat(level - 2).concat('  ') : tab.concat('  ');
    switch (node.type) {
      case 'root':
        return `{\n${node.children.map((child) => iter(child, 1)).join('\n')}\n}`;
      case 'added':
        return `${tab}+ ${node.key}: ${toString(node.value, level + 1)}`;
      case 'updated':
        return `${tab}- ${node.key}: ${toString(node.oldValue, level + 1)}\n${tab}+ ${node.key}: ${toString(node.value, level + 1)}`;
      case 'removed':
        return `${tab}- ${node.key}: ${toString(node.value, level + 1)}`;
      case 'none':
        return `${tab}  ${node.key}: ${toString(node.value, level + 1)}`;
      // Updated object to object
      case 'updated object':
        return `${tab}  ${node.key}: {\n${node.children.map((child) => iter(child, level + 1)).join('\n')}\n${braceTab}}`;
      default:
        return 'Wrong change specified.';
    }
  };
  return iter(tree, 1);
}

function formatToPlain(tree, path = []) {
  const formatted = tree.map((node) => {
    const pathStr = [...path, node.key].join('.');
    const [oldValue, value] = [node.oldValue, node.value]
      .map((val) => ((_.isArray(val) || _.isObject(val)) ? '[ complex value ]' : val));
    switch (node.type) {
      case 'added':
        return `Property '${pathStr}' was added with value: '${toString(value)}'`;
      case 'updated':
        return `Property '${pathStr}' was updated. From '${toString(oldValue)}' to '${toString(value)}'.`;
      case 'removed':
        return `Property '${pathStr}' was removed.`;
      case 'updated object':
        return `${formatToPlain(node.value, [...path, node.key])}`;
      case 'none':
        return undefined;
      default:
        return 'Wrong property change specified.';
    }
  }).filter((line) => line)
    .join('\n');

  return formatted;
}

function formatDiff(diff, outputFormat) {
  switch (outputFormat) {
    case 'debug':
      return `${JSON.stringify(diff, null, 2)}`;
    case 'json':
      return '';
    case 'plain':
      return formatToPlain(diff);
    default:
      return formatToStylish(diff);
  }
}

export default formatDiff;

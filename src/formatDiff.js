import _ from 'lodash';

const isTree = (val) => (_.isObject(val) && !_.isArray(val));
// const toString = (obj) => {
//   if (isTree(obj)) return formatToStylish
// };

function formatToStylish(tree, level = 1) {
  const tabBase = '     ';
  const tab = tabBase.repeat(level - 1);
  const braceTab = (level > 1) ? tabBase.repeat(level - 2).concat('  ') : tabBase.repeat(level - 1).concat('  ');
  console.log(tree);
  const formatted = tree.map((node) => {
    switch (node.type) {
      // case 'added':
      //   return `${tab}+ ${node.key}: ${isTree(node.value) ? formatToStylish(node.value, level + 1) : node.value}`;
      // case 'updated':
      //   return `${tab}- ${node.key}: ${isTree(node.oldValue) ? formatToStylish(node.oldValue, level + 1) : node.oldValue}\n${tab}+ ${node.key}: ${node.value}`;
      // case 'removed':
      //   return `${tab}- ${node.key}: ${isTree(node.value) ? formatToStylish(node.value, level + 1) : node.value}`;
      // case 'none':
      //   return `${tab}  ${node.key}: ${isTree(node.value) ? formatToStylish(node.value, level + 1) : node.value}`;
      case 'added':
        return `${tab}+ ${node.key}: ${node.value}`;
      case 'updated':
        return `${tab}- ${node.key}: ${node.oldValue}\n${tab}+ ${node.key}: ${node.value}`;
      case 'removed':
        return `${tab}- ${node.key}: ${node.value}`;
      case 'none':
        return `${tab}  ${node.key}: ${node.value}`;
      case 'updated object':
        return `${tab}  ${node.key}: ${formatToStylish(node.value, level + 1)}`;
      default:
        return 'Wrong change specified.';
    }
  }).join('\n');

  return `{\n${formatted}\n${braceTab}}`;
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
  const sortedDiff = _.sortBy(diff, ['key']);
  switch (outputFormat) {
    case 'debug':
      return `${JSON.stringify(sortedDiff)}`;
    case 'json':
      return '';
    case 'plain':
      return formatToPlain(sortedDiff);
    default:
      return formatToStylish(sortedDiff);
  }
}

export default formatDiff;

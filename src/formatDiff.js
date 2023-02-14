import _ from 'lodash';

function formatToStylish(diff) {
  const tab = '    ';
  const formatted = diff.map((propDiff) => {
    switch (propDiff.change) {
      case 'added':
        return `${tab}+ ${propDiff.key}: ${propDiff.value}`;
      case 'updated':
        return `${tab}- ${propDiff.key}: ${propDiff.value}\n${tab}+ ${propDiff.key}: ${propDiff.newValue}`;
      case 'removed':
        return `${tab}- ${propDiff.key}: ${propDiff.value}`;
      case 'none':
        return `${tab}  ${propDiff.key}: ${propDiff.value}`;
      default:
        return 'Wrong property change specified.';
    }
  }).join('\n');
  return `{\n${formatted}\n}`;
}

function formatToPlain(diff) {
  return diff.map((propDiff) => {
    switch (propDiff.change) {
      case 'added':
        return `Property '${propDiff.key}' was added with value: '${propDiff.value}'`;
      case 'updated':
        return `Property '${propDiff.key}' was updated. From '${propDiff.value}' to '${propDiff.newValue}'.`;
      case 'removed':
        return `Property '${propDiff.key}' was removed.`;
      case 'none':
        return undefined;
      default:
        return 'Wrong property change specified.';
    }
  }).filter((line) => line)
    .join('\n');
}

function formatDiff(diff, outputFormat) {
  const sortedDiff = _.sortBy(diff, ['key']);
  switch (outputFormat) {
    case 'debug':
      return sortedDiff;
    case 'json':
      return '';
    case 'plain':
      return formatToPlain(sortedDiff);
    default:
      return formatToStylish(sortedDiff);
  }
}

export default formatDiff;

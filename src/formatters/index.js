import toStylish from './stylish.js';
import toPlain from './plain.js';

function formatDiff(diff, outputFormat) {
  switch (outputFormat) {
    case 'json':
      return `${JSON.stringify(diff, null)}`;
    case 'plain':
      return toPlain(diff);
    default:
      return toStylish(diff);
  }
}

export default formatDiff;

import toStylish from './stylish.js';
import toPlain from './plain.js';

function formatDiff(diff, outputFormat) {
  switch (outputFormat) {
    case 'stylish':
      return toStylish(diff);
    case 'json':
      return `${JSON.stringify(diff, null)}`;
    case 'plain':
      return toPlain(diff);
    default:
      throw new Error('Unknown output formatting style.');
  }
}

export default formatDiff;

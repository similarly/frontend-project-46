import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import path from 'path';
import formatDiff from './formatDiff.js';

function getFile(filepath) {
  const resolvedPath = path.resolve(process.cwd(), filepath);
  const file = readFileSync(resolvedPath);
  const object = load(file);
  return object;
}

function generateDiff(filepath1, filepath2, outputFormat = 'stylish') {
  const object1 = getFile(filepath1);
  const object2 = getFile(filepath2);
  const diff = [];
  Object.entries(object1).forEach(([key, value]) => {
    const prop = { key, value };
    if (!Object.hasOwn(object2, key)) {
      diff.push({ ...prop, change: 'removed' });
    } else if (value === object2[key]) {
      diff.push({ ...prop, change: 'none' });
    } else {
      diff.push({ ...prop, change: 'updated', newValue: object2[key] });
    }
  });
  Object.entries(object2).forEach(([key, value]) => {
    const prop = { key, value };
    if (!Object.hasOwn(object1, key)) {
      diff.push({ ...prop, change: 'added' });
    }
  });
  return formatDiff(diff, outputFormat);
}

export default generateDiff;

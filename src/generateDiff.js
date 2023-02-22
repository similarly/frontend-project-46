import { readFileSync } from 'fs';
import formatDiff from './formatDiff.js';
import createDiffTree from './createDiffTree.js';
import parse from './parsers.js';

function getData(filepath) {
  // const resolvedPath = path.resolve(process.cwd(), filepath);
  const resolvedPath = filepath;
  const data = readFileSync(resolvedPath);
  return data;
}

function getDiff(filepath1, filepath2, outputFormat = 'stylish') {
  const getExtension = (filename) => filename.split('.').at(-1);
  const [object1, object2] = [filepath1, filepath2]
    .map((path) => parse(getData(path), getExtension(path)));

  const diffTree = createDiffTree(object1, object2);
  return formatDiff(diffTree, outputFormat);
}

export default getDiff;

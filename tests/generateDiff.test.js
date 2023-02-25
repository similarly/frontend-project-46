import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/generateDiff.js';

const fixturesPath = path.join(__dirname, '__fixtures__');
const getPath = (fileName) => path.join(fixturesPath, fileName);
const getResult = (resultName) => readFileSync(path.join(fixturesPath, 'results', resultName), 'utf-8');

test('main flow', () => {
  const diffStylish = genDiff(getPath('file1.json'), getPath('file2.json'), 'stylish');
  expect(diffStylish).toEqual(getResult('stylish.txt'));

  const diffPlain = genDiff(getPath('file1.json'), getPath('file2.json'), 'plain');
  expect(diffPlain).toEqual(getResult('plain.txt'));

  const diffEmptyPlain = genDiff(getPath('file2.json'), getPath('file3.yaml'), 'json');
  expect(diffEmptyPlain).toEqual(getResult('emptyJson.txt'));

  const diffEmptyStylish = genDiff(getPath('file1.json'), getPath('file3.yaml'));
  expect(diffEmptyStylish).toEqual(getResult('yamlStylish.txt'));
});

test('corner cases', () => {
  expect(() => {
    genDiff(getPath('wrongfiletype1.'), getPath('wrongfiletype2.g'));
  }).toThrow(new Error("Can't parse this filetype."));

  expect(() => {
    genDiff(getPath('file1.json'), getPath('wrongfiletype3'));
  }).toThrow(new Error("Can't parse this filetype."));

  expect(() => {
    genDiff(getPath('sdfsdf'), getPath('sdf'));
  }).toThrow('no such file or directory');

  // expect syntax error
  expect(() => {
    genDiff(getPath('empty.json'), getPath('file1.json'));
  }).toThrow();

  // yaml parser returns undefined when file is empty
  expect(() => {
    genDiff(getPath('empty2.yaml'), getPath('file1.json'));
  }).toThrow('is not valid');
});

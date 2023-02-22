import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/generateDiff.js';

const fixturesPath = path.join(__dirname, '__fixtures__');
const path1 = path.join(fixturesPath, 'file1.json');
const path2 = path.join(fixturesPath, 'file2.json');
const getResult = (resultName) => readFileSync(path.join(fixturesPath, resultName), 'utf-8');

test('main flow', () => {
  const diffStylish = genDiff(path1, path2, 'stylish');
  expect(diffStylish).toEqual(getResult('resultStylish.txt'));

  const diffPlain = genDiff(path2, path1, 'plain');
  expect(diffPlain).toEqual(getResult('resultPlain.txt'));
})

/* test('corner cases', () => {
  const diffPlain = genDiff(path4, path3, 'plain');
  expect(diffPlain).toEqual(`Property 'follow' was added with value: 'false'
Property 'host' was added with value: 'hexlet.io'
Property 'proxy' was added with value: '123.234.53.22'
Property 'timeout' was added with value: '50'`);

  const diffStylish = genDiff(path4, path3, 'stylish');
  expect(diffStylish).toEqual(`{
    + follow: false
    + host: hexlet.io
    + proxy: 123.234.53.22
    + timeout: 50
}`);
  const diffEqualPlain = genDiff(path3, path3, 'plain');
  expect(diffEqualPlain).toEqual('');

  const diffEqualStylish = genDiff(path2, path2, 'stylish');
  expect(diffEqualStylish).toEqual(`{
      host: hexlet.io
      timeout: 20
      verbose: true
}`);
}); */

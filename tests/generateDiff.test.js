import genDiff from '../src/generateDiff.js';
// import { jest } from '@jest/globals'

let [path1, path2, path3] = '';
beforeAll(() => {
  path1 = 'tests/file1.json';
  path2 = 'tests/file2.json';
  path3 = 'tests/file3.yaml';
});

test('plain diff', () => {
  const diffStylish = genDiff(path3, path2, 'stylish');
  expect(diffStylish).toEqual(`{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
}`);

  const diffStylishBack = genDiff(path2, path1, 'stylish');
  expect(diffStylishBack).toEqual(`{
    + follow: false
      host: hexlet.io
    + proxy: 123.234.53.22
    - timeout: 20
    + timeout: 50
    - verbose: true
}`);

  const diffPlain = genDiff(path2, path1, 'plain');
  expect(diffPlain).toEqual(`Property 'follow' was added with value: 'false'
Property 'proxy' was added with value: '123.234.53.22'
Property 'timeout' was updated. From '20' to '50'.
Property 'verbose' was removed.`);

  const diffPlainBack = genDiff(path1, path2, 'plain');
  expect(diffPlainBack).toEqual(`Property 'follow' was removed.
Property 'proxy' was removed.
Property 'timeout' was updated. From '50' to '20'.
Property 'verbose' was added with value: 'true'`);
});

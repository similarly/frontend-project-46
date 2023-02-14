import genDiff from '../src/generateDiff.js';

const commonPath = `${__dirname}/__fixtures__/`;
const path1 = `${commonPath}file1.json`;
const path2 = `${commonPath}file2.json`;
const path3 = `${commonPath}file3.yaml`;
const path4 = `${commonPath}empty.json`;

test('main flow', () => {
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

test('corner cases', () => {
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
});

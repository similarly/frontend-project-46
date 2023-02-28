import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const fixturesPath = path.join(__dirname, '../__fixtures__');
const getPath = (fileName) => path.join(fixturesPath, fileName);
const getResult = (resultName) => readFileSync(path.join(fixturesPath, 'results', resultName), 'utf-8');

test('main flow', () => {
  // Первые два теста и результаты - из инструкции по проекту
  const jsonJsonStylish = genDiff(getPath('file1.json'), getPath('file2.json'), 'stylish');
  expect(jsonJsonStylish).toEqual(getResult('jsonJsonStylish.txt'));

  const jsonJsonPlain = genDiff(getPath('file1.json'), getPath('file2.json'), 'plain');
  expect(jsonJsonPlain).toEqual(getResult('jsonJsonPlain.txt'));

  const jsonYamlStylish = genDiff(getPath('file1.json'), getPath('file3.yaml'), 'stylish');
  expect(jsonYamlStylish).toEqual(getResult('jsonYamlStylish.txt'));
});

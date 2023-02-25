import { load } from 'js-yaml';

function parse(data, extension) {
  const parsers = {
    yml: load,
    yaml: load,
    json: JSON.parse,
  };

  if (!Object.keys(parsers).includes(extension)) {
    throw new Error("Can't parse this filetype.");
  }
  const parsedData = parsers[extension](data);
  if (parsedData !== undefined) {
    return parsedData;
  }
  throw new Error('File data is not valid.');
}

export default parse;

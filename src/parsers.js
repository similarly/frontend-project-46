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
  return parsers[extension](data);
}

export default parse;

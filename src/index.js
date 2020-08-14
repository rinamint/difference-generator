import path from 'path';
import fs from 'fs';
import parse from './parsing.js';
import formatter from './formatters/formatter.js';
import generateDiff from './difference.js';

const readFiles = (pathToFile) => [fs.readFileSync(pathToFile, 'utf-8'), path.extname(pathToFile).slice(1)];

export default (path1, path2, format) => {
  const [firstFile, firstFormat] = readFiles(path1);
  const [secondFile, secondFormat] = readFiles(path2);
  const transition = generateDiff(parse(firstFile, firstFormat), parse(secondFile, secondFormat));
  return formatter(transition, format);
};

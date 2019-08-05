const fs = require('fs-extra');
const path = require('path');
const JSZip = require('jszip');
const recursiveReaddirSync = require('recursive-readdir-sync');

const extPath = require('./getExtPath');
const buildFilePaths = recursiveReaddirSync(path.join(extPath, 'build', 'unpacked'));
const package = fs.readJsonSync('./package.json');

['chrome', 'firefox'].forEach((target) => {
  const zip = new JSZip();
  const zipName = `${target}-${package.version}`;
  const zipPath = `build/${zipName}.zip`;

  fs.removeSync(zipPath);

  if (target === 'chrome') {
    buildFilePaths.forEach((filePath) => {
      const parsed = path.parse(filePath);
      const dirs = parsed.dir.split(path.sep).filter((dir) => dir !== 'build');
      zip.folder(zipName).file(path.join(...dirs, parsed.base), fs.readFileSync(filePath));
    });
  } else if (target === 'firefox') {
    buildFilePaths.forEach((filePath) => {
      const parsed = path.parse(filePath);
      const dirs = parsed.dir.split(path.sep).filter((dir) => dir !== 'build');
      zip.file(path.join(...dirs, parsed.base), fs.readFileSync(filePath));
    });
  }

  zip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true, compression: 'DEFLATE' })
    .pipe(fs.createWriteStream(zipPath))
    .on('finish', () => console.log(`${zipPath} created.`));
});

const sourceFilePaths = recursiveReaddirSync(path.join(extPath));
const sourceZip = new JSZip();
const sourceZipName = `source-${package.version}`;
const sourceZipPath = `build/${sourceZipName}.zip`;

fs.removeSync(sourceZipPath);

sourceFilePaths.forEach((filePath) => {
  const pathsToSkip = ['.git', 'build', 'node_modules'];

  if (pathsToSkip.some((pathToSkip) => path.join(filePath).startsWith(path.join(extPath, pathToSkip)))) {
    return;
  }

  sourceZip.file(filePath, fs.readFileSync(filePath));
});

sourceZip
  .generateNodeStream({ type: 'nodebuffer', streamFiles: true, compression: 'DEFLATE' })
  .pipe(fs.createWriteStream(sourceZipPath))
  .on('finish', () => console.log(`${sourceZipPath} created.`));

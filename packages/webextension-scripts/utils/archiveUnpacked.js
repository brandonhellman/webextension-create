const archiver = require('archiver');
const fs = require('fs-extra');
const path = require('path');

const extPath = require('./getExtPath');
const unpackedPath = path.join(extPath, 'build', 'unpacked');
const package = fs.readJsonSync('./package.json');

['chrome', 'firefox'].forEach((target) => {
  const zipName = `${target}-${package.version}`;
  const zipPath = `build/${zipName}.zip`;

  fs.removeSync(zipPath);

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', {
    forceLocalTime: true, // Forces the archive to contain local file times instead of UTC.
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log(`${zipPath} created: ${archive.pointer()} total bytes`);
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  if (target === 'chrome') {
    archive.directory(unpackedPath, zipName);
  } else if (target === 'firefox') {
    archive.directory(unpackedPath, false);
  }

  archive.finalize();
});

const sourceZipName = `source-${package.version}`;
const sourceZipPath = `build/${sourceZipName}.zip`;

fs.removeSync(sourceZipPath);

const sourceOutput = fs.createWriteStream(sourceZipPath);
const sourceArchive = archiver('zip', {
  forceLocalTime: true, // Forces the archive to contain local file times instead of UTC.
  zlib: { level: 9 }, // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
sourceOutput.on('close', function() {
  console.log(`${sourceZipPath} created: ${sourceArchive.pointer()} total bytes`);
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
sourceOutput.on('end', function() {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
sourceArchive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
sourceArchive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
sourceArchive.pipe(sourceOutput);

// sourceArchive.directory(extPath, false);
sourceArchive.glob('**', {
  cwd: extPath,
  ignore: ['build/**', 'node_modules/**'],
});

sourceArchive.finalize();

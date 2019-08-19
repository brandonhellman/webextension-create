import archiver from 'archiver';
import fs from 'fs-extra';

import * as ext from './ext';

function archiveCreate(target: 'chrome' | 'firefox' | 'source') {
  return new Promise((resolve, reject) => {
    const name = `${target}-${ext.packageJson.version}`;
    const path = `build/${name}.zip`;

    fs.removeSync(path);

    const output = fs.createWriteStream(path);
    const archive = archiver('zip', {
      forceLocalTime: true, // Forces the archive to contain local file times instead of UTC.
      zlib: { level: 9 }, // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', () => {
      console.log(`${path} created: ${archive.pointer()} total bytes`);
      resolve();
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', () => {
      reject(new Error('Data has been drained'));
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        // log warning
        console.log('ENOENT', err.message);
      } else {
        // throw error
        reject(err);
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // choose what files need to be archived
    switch (target) {
      case 'chrome':
        archive.directory(ext.pathToUnpacked, name);
        break;
      case 'firefox':
        archive.directory(ext.pathToUnpacked, false);
        break;
      case 'source':
        archive.glob('**', {
          cwd: ext.pathToRoot,
          ignore: ['build/**', 'node_modules/**'],
        });
        break;
    }

    archive.finalize();
  });
}

export async function archiveUnpacked() {
  const chrome = archiveCreate('chrome');
  const firefox = archiveCreate('firefox');
  const source = archiveCreate('source');

  try {
    await Promise.all([chrome, firefox, source]);

    console.log();
    console.log('Success! Done compiling and archiving production folders');
  } catch (err) {
    console.log();
    console.error('ERR!', err);
  }
}

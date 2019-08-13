const fs = require('fs-extra');

fs.copyFileSync('src/index.d.ts', 'bin/index.d.ts');

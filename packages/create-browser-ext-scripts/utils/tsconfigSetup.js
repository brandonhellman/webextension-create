const fs = require('fs-extra');
const path = require('path');

const extPackage = require('./getExtPackage');
const extPath = require('./getExtPath');

const dependencies = extPackage.dependencies || {};
const tsconfigPath = path.join(extPath, 'tsconfig.json');
const tsconfigExists = fs.existsSync(tsconfigPath);

if (dependencies.typescript && !tsconfigExists) {
  console.log('Setting up tsconfig.json');

  const tsconfig = {
    compilerOptions: {
      esModuleInterop: true,
      sourceMap: true,
      noImplicitAny: true,
      module: 'commonjs',
      target: 'es6',
      jsx: 'react',
      lib: ['es2017', 'dom'],
    },
  };

  fs.outputJsonSync(tsconfigPath, tsconfig, { spaces: 2 });
}

const fs = require('fs-extra');

const packageJson = require('./packageJson');
const paths = require('./paths');

const tsconfigExists = fs.existsSync(paths.extTsconfigJson);

if (packageJson.dependencies && packageJson.dependencies.typescript && !tsconfigExists) {
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

  fs.outputJsonSync(paths.extTsconfigJson, tsconfig, { spaces: 2 });
}

import fs from 'fs-extra';

import packageJson from './packageJson';
import paths from './paths';

const tsconfigExists = fs.existsSync(paths.extTsconfigJson);

if (packageJson.dependencies && packageJson.dependencies.typescript && !tsconfigExists) {
  console.log('Setting up tsconfig.json');

  const tsconfig = {
    compilerOptions: {
      esModuleInterop: true,
      inlineSourceMap: true,
      noImplicitAny: true,
      module: 'commonjs',
      target: 'es6',
      jsx: 'react',
      lib: ['es2018', 'dom'],
    },
  };

  fs.outputJsonSync(paths.extTsconfigJson, tsconfig, { spaces: 2 });
}

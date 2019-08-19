import fs from 'fs-extra';

import * as ext from '../utils/ext';

export function tsconfigSetup() {
  const tsconfigExists = fs.existsSync(ext.pathToTsconfigJson);

  if (tsconfigExists) {
    return;
  }

  const packageJson = ext.getPackageJson();

  if (!packageJson.dependencies || !packageJson.dependencies.typescript) {
    return;
  }

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

  fs.outputJsonSync(ext.pathToTsconfigJson, tsconfig, { spaces: 2 });

  console.log();
  console.log('tsconfig.json setup is complete');
}

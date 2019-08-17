import fs from 'fs-extra';

import { extPackageJson } from '../utils/extPackageJson';
import * as paths from '../utils/paths';

export default function init(template: string | undefined) {
  extPackageJson.scripts = {
    start: 'webextension-scripts start',
    build: 'webextension-scripts build',
  };

  fs.outputJsonSync(paths.extPackageJson, extPackageJson, { spaces: 2 });

  fs.copySync(paths.templatesGitignore, paths.extGitignore);
  fs.copySync(paths.templatesReadme, paths.extReadme);

  const dependencies = extPackageJson.dependencies || {};

  if (dependencies.react && dependencies.typescript) {
    fs.copySync(paths.templatesReactTypescript, paths.extSrc);
    fs.copySync(paths.templatesEnvTypes, paths.extEnvTypes);
  } else if (dependencies.react) {
    fs.copySync(paths.templatesReact, paths.extSrc);
  } else if (dependencies.typescript) {
    fs.copySync(paths.templatesTypescript, paths.extSrc);
  } else {
    fs.copySync(paths.templatesJs, paths.extSrc);
  }
}

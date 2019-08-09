const fs = require('fs-extra');

const package = require('../utils/packageJson');
const paths = require('../utils/paths');

require('../utils/tsconfigSetup');

package.scripts = {
  start: 'webextension-scripts start',
  build: 'webextension-scripts build',
};

fs.outputJsonSync(paths.extPackageJson, package, { spaces: 2 });

fs.copySync(paths.templatesGitignore, paths.extGitignore);
fs.copySync(paths.templatesReadme, paths.extReadme);

if (package.dependencies.react && package.dependencies.typescript) {
  fs.copySync(paths.templatesReactTypescript, paths.extRoot);
} else if (package.dependencies.react) {
  fs.copySync(paths.templatesReact, paths.extRoot);
} else if (package.dependencies.typescript) {
  fs.copySync(paths.templatesTypescript, paths.extRoot);
} else {
  fs.copySync(paths.templatesJs, paths.extRoot);
}

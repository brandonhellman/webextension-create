import fs from 'fs-extra';
import spawn from 'cross-spawn';

import * as ext from '../utils/ext';
import * as pkg from '../utils/pkg';
import { tsconfigSetup } from '../utils/tsconfigSetup';

const copy = {
  gitignore() {
    fs.copySync(pkg.pathToGitignore, ext.pathToGitignore);

    console.log();
    console.log(`Copied .gitignore into ${ext.pathToRoot}`);
  },
  readme() {
    fs.copySync(pkg.pathToReadme, ext.pathToReadme);

    console.log();
    console.log(`Copied README.md into ${ext.pathToRoot}`);
  },
  js() {
    fs.copySync(pkg.pathToJs, ext.pathToSrc);

    console.log();
    console.log(`Copied the js template into ${ext.pathToSrc}`);
  },
  react() {
    reactInstaller();
    fs.copySync(pkg.pathToReact, ext.pathToSrc);

    console.log();
    console.log(`Copied the react template into ${ext.pathToSrc}`);
  },
  reactTypescript() {
    reactInstaller();
    typescriptInstaller();
    fs.copySync(pkg.pathToReactTypescript, ext.pathToSrc);
    fs.copySync(pkg.pathToEnvTypes, ext.pathToEnvTypes);

    console.log();
    console.log(`Copied the reactTypescript template into ${ext.pathToSrc}`);
  },
  typescript() {
    typescriptInstaller();
    fs.copySync(pkg.pathToTypescript, ext.pathToSrc);

    console.log();
    console.log(`Copied the typescript template into ${ext.pathToSrc}`);
  },
};

function extHasSrc() {
  return fs.pathExistsSync(ext.pathToSrc);
}

function reactInstaller() {
  const dependencies = ext.packageJson.dependencies || {};

  if (!dependencies.react && !dependencies['react-dom']) {
    console.log('Installing react and react-dom');
    console.log();

    const proc = spawn.sync('npm', ['install', '-S', 'react', 'react-dom'], { stdio: 'inherit', cwd: ext.pathToRoot });

    if (proc.status !== 0) {
      console.error('Failed when installing react and react-dom');
    }
  }
}

function typescriptInstaller() {
  const dependencies = ext.packageJson.dependencies || {};

  if (!dependencies.typescript) {
    console.log('Installing typescript');
    console.log();

    const proc = spawn.sync('npm', ['install', '-S', 'typescript'], { stdio: 'inherit', cwd: ext.pathToRoot });

    if (proc.status !== 0) {
      console.error('Failed when installing react and react-dom');
    }
  }

  if (dependencies.react || !dependencies['react-dom']) {
    console.log('Installing @types/react and @types/react-dom');
    console.log();

    const proc = spawn.sync('npm', ['install', '-S', '@types/react', '@types/react-dom'], {
      stdio: 'inherit',
      cwd: ext.pathToRoot,
    });

    if (proc.status !== 0) {
      console.error('Failed when installing react and react-dom');
    }
  }
}

export default function init(template: 'js' | 'react' | 'reactTypescript' | 'typescript' | undefined) {
  ext.packageJson.scripts = {
    start: 'webextension-scripts start',
    build: 'webextension-scripts build',
  };

  fs.outputJsonSync(ext.pathToPackageJson, ext.packageJson, { spaces: 2 });

  if (template) {
    copy.gitignore();
    copy.readme();

    if (copy[template]) {
      if (!extHasSrc()) {
        copy[template]();
      } else {
        console.log();
        console.error(`${ext.pathToSrc} already exists`);
      }
    } else {
      console.log();
      console.error(`Incorrect template provided, nothing copied to ${ext.pathToSrc}`);
    }
  }

  tsconfigSetup();
}

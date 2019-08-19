import chalk from 'chalk';
import fs from 'fs-extra';
import spawn from 'cross-spawn';

import * as ext from '../utils/ext';
import * as pkg from '../utils/pkg';
import { tsconfigSetup } from '../utils/tsconfigSetup';

const copy = {
  gitignore() {
    fs.copySync(pkg.pathToGitignore, ext.pathToGitignore);

    console.log();
    console.log(`Copied .gitignore into ${chalk.green(ext.pathToRoot)}`);
  },
  readme() {
    fs.copySync(pkg.pathToReadme, ext.pathToReadme);

    console.log();
    console.log(`Copied README.md into ${chalk.green(ext.pathToRoot)}`);
  },
  js() {
    fs.copySync(pkg.pathToJs, ext.pathToSrc);

    console.log();
    console.log(`Copied the js template into ${chalk.green(ext.pathToSrc)}`);
  },
  react() {
    reactInstaller();
    fs.copySync(pkg.pathToReact, ext.pathToSrc);

    console.log();
    console.log(`Copied the react template into ${chalk.green(ext.pathToSrc)}`);
  },
  reactTypescript() {
    reactInstaller();
    reactTypesInstaller();
    typescriptInstaller();
    tsconfigSetup();
    fs.copySync(pkg.pathToReactTypescript, ext.pathToSrc);
    fs.copySync(pkg.pathToEnvTypes, ext.pathToEnvTypes);

    console.log();
    console.log(`Copied the reactTypescript template into ${chalk.green(ext.pathToSrc)}`);
  },
  typescript() {
    typescriptInstaller();
    tsconfigSetup();
    fs.copySync(pkg.pathToTypescript, ext.pathToSrc);

    console.log();
    console.log(`Copied the typescript template into ${chalk.green(ext.pathToSrc)}`);
  },
};

function extHasSrc() {
  return fs.pathExistsSync(ext.pathToSrc);
}

function scriptRulesSetup() {
  ext.packageJson.scripts = {
    start: 'webextension-scripts start',
    build: 'webextension-scripts build',
  };

  fs.outputJsonSync(ext.pathToPackageJson, ext.packageJson, { spaces: 2 });

  console.log();
  console.log(`Script rules setup in ${chalk.green(ext.pathToPackageJson)}`);
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

function reactTypesInstaller() {
  const dependencies = ext.packageJson.dependencies || {};

  if (!dependencies['@types/react'] || !dependencies['@types/react-dom']) {
    console.log('Installing @types/react and @types/react-dom');
    console.log();

    const proc = spawn.sync('npm', ['install', '-S', '@types/react', '@types/react-dom'], {
      stdio: 'inherit',
      cwd: ext.pathToRoot,
    });

    if (proc.status !== 0) {
      console.error('Failed when installing @types/react and @types/react-dom');
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
}

export function init(template: string | undefined) {
  if (template) {
    if (extHasSrc()) {
      console.log();
      console.error(`ERR! ${chalk.red(ext.pathToSrc)} already exists`);
      return;
    }

    switch (template) {
      case 'JavaScript':
        copy.js();
        break;
      case 'TypeScript':
        copy.typescript();
        break;
      case 'React':
        copy.react();
        break;
      case 'ReactTypescript':
        copy.reactTypescript();
        break;
      default:
        console.log();
        console.error(`ERR! An incorrect template ${chalk.red(template)} was provided`);
        return;
    }

    copy.gitignore();
    copy.readme();
  } else {
    console.log();
    console.log('No template was provided');
  }

  scriptRulesSetup();
}

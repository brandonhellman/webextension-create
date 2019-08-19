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
  javascript() {
    fs.copySync(pkg.pathToJavascript, ext.pathToSrc);

    console.log();
    console.log(`Copied the javascript template into ${chalk.green(ext.pathToSrc)}`);
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
    console.log(`Copied the react-typescript template into ${chalk.green(ext.pathToSrc)}`);
  },
  typescript() {
    typescriptInstaller();
    tsconfigSetup();
    fs.copySync(pkg.pathToTypescript, ext.pathToSrc);
    fs.copySync(pkg.pathToEnvTypes, ext.pathToEnvTypes);
    
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
      console.error(`${chalk.red(ext.pathToSrc)} already exists!`);
      return;
    }

    switch (template) {
      case 'javascript':
        copy.javascript();
        break;
      case 'react':
        copy.react();
        break;
      case 'react-typescript':
        copy.reactTypescript();
        break;
      case 'typescript':
        copy.typescript();
        break;
      default:
        console.log();
        console.error(`The provided template ${chalk.red(template)} does not exist!`);
        return;
    }

    copy.gitignore();
    copy.readme();
  } else {
    console.log();
    console.log('No template provided');
  }

  scriptRulesSetup();
}

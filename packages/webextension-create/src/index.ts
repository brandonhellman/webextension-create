#!/usr/bin/env node

import chalk from 'chalk';
import program from 'commander';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import spawn from 'cross-spawn';
import validate from 'validate-npm-package-name';

const packageJson = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));

program
  .name(packageJson.name)
  .version(packageJson.version)
  .option('-d, --dev', 'Use link instead of install for webextension-scripts')
  .parse(process.argv);

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the name of your project',
    default: 'my-webextension',
    validate(value: string | undefined) {
      const valid = validate(value);

      if (!valid.validForNewPackages) {
        if (valid.errors) return valid.errors[0];
        if (valid.warnings) return valid.warnings[0];
      }

      const pathExists = value && fs.existsSync(path.resolve(value));

      if (pathExists) {
        return 'The path already exists! Please try a different name or delete the folder.';
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'template',
    message: 'Choose a webextension template to use',
    choices: ['javascript', 'react', 'react-typescript', 'typescript'],
    default: 'javascript',
  },
];

// @ts-ignore
inquirer.prompt(questions).then((answers: { name: string; template: string }) => {
  createBrowserExtension(answers.name, answers.template, program.dev);
});

function createBrowserExtension(name: string, template: string, dev: boolean) {
  const extPathToRoot = path.resolve(name);

  fs.ensureDirSync(name);

  createPackageJson(extPathToRoot, name);
  installScripts(extPathToRoot, dev);
  initScript(extPathToRoot, template);

  console.log();
  console.log(`webextension-create finished creating ${chalk.green(name)}`);
}

function createPackageJson(extPathToRoot: string, extName: string) {
  console.log();
  console.log(`Creating package.json for ${extName} in ${chalk.green(extPathToRoot)}`);
  console.log();

  const packageJson = {
    name: extName,
    version: '0.1.0',
  };

  fs.outputJsonSync(path.join(extPathToRoot, 'package.json'), packageJson, { spaces: 2 });
}

function installScripts(extPathToRoot: string, dev: boolean) {
  const command = !dev ? 'install' : 'link';

  console.log(`${command} webextension-scripts in ${chalk.green(extPathToRoot)}`);
  console.log();

  spawn.sync('npm', [command, '-S', 'webextension-scripts'], { stdio: 'inherit', cwd: extPathToRoot });
}

function initScript(extPathToRoot: string, template: string) {
  console.log(`Running webextension-scripts init ${template}`);
  console.log();

  spawn.sync('webextension-scripts', ['init', template], { stdio: 'inherit', cwd: extPathToRoot });
}

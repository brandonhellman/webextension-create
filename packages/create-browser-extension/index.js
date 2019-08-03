#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const spawn = require('cross-spawn');
const validate = require('validate-npm-package-name');

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name',
    default: 'my-web-extension',
    validate(value) {
      const valid = validate(value);

      if (!valid.validForNewPackages) {
        if (valid.errors) return valid.errors[0];
        if (valid.warnings) return valid.warnings[0];
      }

      const pathExists = fs.existsSync(path.resolve(value));

      if (pathExists) {
        return 'The path already exists! Please try a different name or delete the folder.';
      }

      return true;
    },
  },
  {
    type: 'input',
    name: 'extensionName',
    message: 'Extension name',
    default: 'My Web Extension',
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version',
    default: '0.0.0',
  },
  {
    type: 'confirm',
    name: 'useReact',
    message: 'Do you want to use React?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'useTypescript',
    message: 'Do you want to use Typescript?',
    default: false,
  },
];

inquirer.prompt(questions).then((answers) => {
  createBrowserExtension(
    answers.projectName,
    answers.extensionName,
    answers.version,
    answers.useReact,
    answers.useTypescript,
  );
});

async function createBrowserExtension(projectName, extensionName, version, useReact, useTypescript) {
  const projectRoot = path.resolve(projectName);

  fs.ensureDirSync(projectName);

  createPackageJson(projectRoot, projectName, extensionName, version);
  installDependencies(projectRoot, useReact, useTypescript);

  spawn.sync('create-browser-extension-scripts', ['init'], { stdio: 'inherit', cwd: projectRoot });

  console.log(`Done creating ${chalk.green(projectName)}.`);
}

async function createPackageJson(projectRoot, projectName, extensionName, version) {
  console.log(`Creating a new browser extension in ${chalk.green(projectRoot)}.`);
  console.log();

  const packageJson = {
    name: projectName,
    extensionName: extensionName,
    version: version,
  };

  fs.outputJsonSync(path.join(projectRoot, 'package.json'), packageJson, { spaces: 2 });
}

async function installDependencies(projectRoot, useReact, useTypescript) {
  const dependencies = []; // 'create-browser-extension-scripts'
  const devDependencies = [];

  if (useReact) {
    dependencies.push('react', 'react-dom');
  }

  if (useTypescript) {
    devDependencies.push('@types/react', '@types/react-dom', 'typescript');
  }

  console.log(`Installing dependencies in ${chalk.green(projectRoot)}.`);
  console.log();

  spawn.sync('npm', ['install', ...dependencies, '-S'], { stdio: 'inherit', cwd: projectRoot });

  console.log(`Installing devDependencies in ${chalk.green(projectRoot)}.`);
  console.log();

  spawn.sync('npm', ['install', ...devDependencies, '-D'], { stdio: 'inherit', cwd: projectRoot });
}

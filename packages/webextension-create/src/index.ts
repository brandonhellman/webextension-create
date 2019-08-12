#!/usr/bin/env node

import chalk from 'chalk';
import commander from 'commander';
import fs from 'fs-extra';
import path from 'path';
import spawn from 'cross-spawn';
import validate from 'validate-npm-package-name';

const packageJson = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));

let extName = '';

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option('-r, --react', 'Use React in your extension.')
  .option('-t, --typescript', 'Use Typescript in your extension.')
  .option('--dev')
  .action((dir: string) => {
    extName = dir;
  })
  .parse(process.argv);

if (!extName) {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-browser-ext')}`);
  console.log();
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
  process.exit(1);
}

const valid = validate(extName);

if (!valid.validForNewPackages) {
  console.log('Invalid directory name:');
  if (valid.errors) console.log(`  ${valid.errors[0]}`);
  if (valid.warnings) console.log(`  ${valid.warnings[0]}`);
  process.exit(1);
}

const pathExists = fs.existsSync(path.resolve(extName));

if (pathExists) {
  console.log('The path already exists! Please try a different name or delete the folder.');
  process.exit(1);
}

if (extName) {
  createBrowserExtension(extName, program.react, program.typescript, program.dev);
}

function createBrowserExtension(extName: string, useReact: boolean, useTypescript: boolean, isDev: boolean) {
  const projectRoot = path.resolve(extName);

  fs.ensureDirSync(extName);

  createPackageJson(projectRoot, extName);
  installDependencies(projectRoot, useReact, useTypescript, isDev);

  spawn.sync('webextension-scripts', ['init'], { stdio: 'inherit', cwd: projectRoot });

  console.log(`Done creating ${chalk.green(extName)}.`);
}

function createPackageJson(projectRoot: string, extName: string) {
  console.log(`Creating a new browser extension in ${chalk.green(projectRoot)}.`);
  console.log();

  const packageJson = {
    name: extName,
    version: '0.1.0',
  };

  fs.outputJsonSync(path.join(projectRoot, 'package.json'), packageJson, { spaces: 2 });
}

function installDependencies(projectRoot: string, useReact: boolean, useTypescript: boolean, isDev: boolean) {
  const dependencies = isDev ? [] : ['webextension-scripts'];

  if (useReact) {
    dependencies.push('react', 'react-dom');
  }

  if (useTypescript) {
    dependencies.push('typescript');
  }

  if (useReact && useTypescript) {
    dependencies.push('@types/react', '@types/react-dom');
  }

  console.log(`Installing dependencies in ${chalk.green(projectRoot)}.`);
  console.log();

  spawn.sync('npm', ['install', ...dependencies, '-S'], { stdio: 'inherit', cwd: projectRoot });

  if (isDev) {
    console.log(`Linking dependencies in ${chalk.green(projectRoot)}.`);
    console.log();

    spawn.sync('npm', ['link', 'webextension-scripts'], { stdio: 'inherit', cwd: projectRoot });
  }
}

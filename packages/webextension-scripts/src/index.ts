#!/usr/bin/env node

import program from 'commander';

import { build } from './scripts/build';
import { init } from './scripts/init';
import { start } from './scripts/start';
import { packageJson } from './utils/pkg';

let script: string | undefined;
let option: string | undefined;

program
  .name(packageJson.name)
  .version(packageJson.version)
  .usage('<script> [option]');

program
  .command('build')
  .description('build folders ready for distribution')
  .action(() => {
    script = 'build';
  });

program
  .command('init [template]')
  .description('initialize webextension-scripts in the current directory')
  .action((template) => {
    script = 'init';
    option = template;
  });

program
  .command('start')
  .description('start developing the web extension with auto reload')
  .action(() => {
    script = 'start';
  });

program.parse(process.argv);

switch (script) {
  case 'build':
    build();
    break;
  case 'init':
    init(option);
    break;
  case 'start':
    start();
    break;
  default:
    program.outputHelp();
}

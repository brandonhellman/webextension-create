#!/usr/bin/env node

import program from 'commander';

const packageJson = require('../package.json');

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
  .command('start [browser]')
  .description('start developing the web extension')
  .action((browser) => {
    script = 'start';
    option = browser;
  });

program.parse(process.argv);

switch (script) {
  case 'build':
    require('./scripts/build').default();
    break;
  case 'init':
    require('./scripts/init').default(option);
    break;
  case 'start':
    require('./scripts/start').default(option);
    break;
  default:
    program.outputHelp();
}

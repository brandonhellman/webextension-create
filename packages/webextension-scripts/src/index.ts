#!/usr/bin/env node

const args = process.argv.slice(2);
const script = args[0];

switch (script) {
  case 'start':
  case 'build':
  case 'init':
    require('./utils/tsconfigSetup');
    require(`./scripts/${script}`);
    break;
  default:
    console.log(`Unknown script "${script}".`);
    break;
}

#!/usr/bin/env node

const args = process.argv.slice(2);
const script = args[0];

switch (script) {
  case 'build':
  case 'dist':
  case 'init':
    require(`./scripts/${script}`);
    break;
  default:
    console.log(`Unknown script "${script}".`);
    break;
}

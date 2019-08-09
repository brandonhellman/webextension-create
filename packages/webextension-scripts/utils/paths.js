const path = require('path');
const fs = require('fs-extra');

const extDirectory = fs.realpathSync(process.cwd());
const scriptsDirectory = path.dirname(require.main.filename);

function resolveExt(relativePath) {
  return path.resolve(extDirectory, relativePath);
}

function resolveScripts(relativePath) {
  return path.resolve(scriptsDirectory, 'templates', relativePath);
}

function resolveTemplates(relativePath) {
  return path.resolve(scriptsDirectory, 'templates', relativePath);
}

module.exports = {
  extRoot: resolveExt('.'),
  extBuild: resolveExt('build'),
  extUnpacked: resolveExt('build/unpacked'),
  extPublic: resolveExt('public'),
  extSrc: resolveExt('src'),
  extManifestJs: resolveExt('src/manifest.js'),
  extManifestJson: resolveExt('src/manifest.json'),
  extPackageJson: resolveExt('package.json'),
  extTsconfigJson: resolveExt('tsconfig.json'),
  extGitignore: resolveExt('.gitignore'),
  extReadme: resolveExt('README.md'),
  scriptsNodeModules: resolveScripts('node_modules'),
  templatesRoot: resolveTemplates('.'),
  templatesJs: resolveTemplates('js'),
  templatesReact: resolveTemplates('react'),
  templatesReactTypescript: resolveTemplates('react-typescript'),
  templatesTypescript: resolveTemplates('typescript'),
  templatesGitignore: resolveTemplates('.gitignore'),
  templatesReadme: resolveTemplates('README.md'),
};

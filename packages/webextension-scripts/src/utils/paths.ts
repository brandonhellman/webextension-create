import path from 'path';
import fs from 'fs-extra';

const extDirectory = fs.realpathSync(process.cwd());
const scriptsDirectory = path.join(__dirname, '..', 'scripts');

function resolveExt(relativePath: string) {
  return path.resolve(extDirectory, relativePath);
}

function resolveScripts(relativePath: string) {
  return path.resolve(scriptsDirectory, relativePath);
}

function resolveTemplates(relativePath: string) {
  return path.resolve(scriptsDirectory, 'templates', relativePath);
}

export default {
  extRoot: resolveExt('.'),
  extBuild: resolveExt('build'),
  extUnpacked: resolveExt('build/unpacked'),
  extPublic: resolveExt('public'),
  extSrc: resolveExt('src'),
  extManifestJs: resolveExt('src/manifest.js'),
  extManifestJson: resolveExt('src/manifest.json'),
  extEnvTypes: resolveExt('src/webextension-env.d.ts'),
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
  templatesEnvTypes: resolveTemplates('webextension-env.d.ts'),
};

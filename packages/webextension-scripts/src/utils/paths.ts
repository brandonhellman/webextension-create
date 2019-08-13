import path from 'path';
import fs from 'fs-extra';

const extDirectory = fs.realpathSync(process.cwd());
const pkgDirectory = path.join(__dirname, '..', '..');
// const scriptsDirectory = path.join(__dirname, '..', 'scripts');

function resolveExt(relativePath: string) {
  return path.resolve(extDirectory, relativePath);
}

function resolveScripts(relativePath: string) {
  return path.resolve(pkgDirectory, 'scripts', relativePath);
}

function resolveTemplates(relativePath: string) {
  return path.resolve(pkgDirectory, 'templates', relativePath);
}

export const extRoot = resolveExt('.');
export const extBuild = resolveExt('build');
export const extUnpacked = resolveExt('build/unpacked');
export const extPublic = resolveExt('public');
export const extSrc = resolveExt('src');
export const extManifestJs = resolveExt('src/manifest.js');
export const extManifestJson = resolveExt('src/manifest.json');
export const extEnvTypes = resolveExt('src/webextension-env.d.ts');
export const extPackageJson = resolveExt('package.json');
export const extTsconfigJson = resolveExt('tsconfig.json');
export const extGitignore = resolveExt('.gitignore');
export const extReadme = resolveExt('README.md');
export const scriptsNodeModules = resolveScripts('node_modules');
export const templatesRoot = resolveTemplates('.');
export const templatesJs = resolveTemplates('js');
export const templatesReact = resolveTemplates('react');
export const templatesReactTypescript = resolveTemplates('react-typescript');
export const templatesTypescript = resolveTemplates('typescript');
export const templatesGitignore = resolveTemplates('.gitignore');
export const templatesReadme = resolveTemplates('README.md');
export const templatesEnvTypes = resolveTemplates('webextension-env.d.ts');

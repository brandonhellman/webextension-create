import fs from 'fs-extra';
import path from 'path';

const extDirectory = fs.realpathSync(process.cwd());

function resolve(relativePath: string) {
  return path.resolve(extDirectory, relativePath);
}

export const pathToRoot = resolve('.');
export const pathToBuild = resolve('build');
export const pathToUnpacked = resolve('build/unpacked');
export const pathToPublic = resolve('public');
export const pathToSrc = resolve('src');
export const pathToManifestJs = resolve('src/manifest.js');
export const pathToManifestJson = resolve('src/manifest.json');
export const pathToEnvTypes = resolve('src/webextension-env.d.ts');
export const pathToPackageJson = resolve('package.json');
export const pathToTsconfigJson = resolve('tsconfig.json');
export const pathToGitignore = resolve('.gitignore');
export const pathToReadme = resolve('README.md');
export const packageJson = fs.readJsonSync(pathToPackageJson);
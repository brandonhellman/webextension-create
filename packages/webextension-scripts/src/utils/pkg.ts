import fs from 'fs-extra';
import path from 'path';

const pkgDirectory = path.join(__dirname, '..', '..');

function resolve(relativePath: string) {
  return path.resolve(pkgDirectory, relativePath);
}

export const pathToPackageJson = resolve('package.json');
export const pathToNodeModules = resolve('node_modules');
export const pathToJavascript = resolve('templates/javascript');
export const pathToReact = resolve('templates/react');
export const pathToReactTypescript = resolve('templates/react-typescript');
export const pathToTypescript = resolve('templates/typescript');
export const pathToGitignore = resolve('templates/.gitignore');
export const pathToReadme = resolve('templates/README.md');
export const pathToEnvTypes = resolve('templates/webextension-env.d.ts');
export const packageJson = fs.existsSync(pathToPackageJson) ? fs.readJsonSync(pathToPackageJson) : null;

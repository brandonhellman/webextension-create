import path from 'path';

const pkgDirectory = path.join(__dirname, '..', '..');

function resolve(relativePath: string) {
  return path.resolve(pkgDirectory, relativePath);
}

export const pathToNodeModules = resolve('node_modules');
export const pathToJs = resolve('templates/js');
export const pathToReact = resolve('templates/react');
export const pathToReactTypescript = resolve('templates/react-typescript');
export const pathToTypescript = resolve('templates/typescript');
export const pathToGitignore = resolve('templates/.gitignore');
export const pathToReadme = resolve('templates/README.md');
export const pathToEnvTypes = resolve('templates/webextension-env.d.ts');

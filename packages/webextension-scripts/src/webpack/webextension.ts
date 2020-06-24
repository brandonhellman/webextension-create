import flatten from 'flat';
import fs from 'fs-extra';
import glob from 'glob';
import { JSDOM } from 'jsdom';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import GenerateJsonPlugin from 'generate-json-webpack-plugin';
import ExtensionReloader from 'webpack-extension-reloader/dist/webpack-extension-reloader';

import * as ext from '../utils/ext';
import * as pkg from '../utils/pkg';

interface ReloaderEntries {
  background: string;
  contentScript: string[];
  extensionPage: string[];
}

export interface WebpackEntries {
  [key: string]: any;
}

export interface WebpackPlugins {
  [key: string]: any;
}

export function webextension() {
  const manifestJsExists = fs.pathExistsSync(ext.pathToManifestJs);
  const manifestJsonExists = fs.pathExistsSync(ext.pathToManifestJson);

  const reloaderEntries: ReloaderEntries = { background: '', contentScript: [], extensionPage: [] };
  const webpackEntries: WebpackEntries = {};
  const webpackPlugins: WebpackPlugins[] = [];

  let manifest;
  let polyfill;

  if (!manifest && manifestJsExists) {
    manifest = require(ext.pathToManifestJs);
  }

  if (!manifest && manifestJsonExists) {
    manifest = ext.manifestJson;
  }

  if (!manifest) {
    throw new Error('No manifest found!');
  } else {
    const replaced = JSON.stringify(manifest)
      .replace(/__package\.name__/g, ext.packageJson.name)
      .replace(/__package\.version__/g, ext.packageJson.version)
      .replace(/\.jsx"/g, '.js"')
      .replace(/\.tsx"/g, '.js"')
      .replace(/\.ts"/g, '.js"');

    webpackPlugins.push(new GenerateJsonPlugin('manifest.json', JSON.parse(replaced)));
  }

  // Look for any .png in the manifest and copy it over.
  Object.values(flatten(manifest)).forEach((value) => {
    if (typeof value === 'string') {
      const parsed = path.parse(value);

      if (parsed.ext === '.png' && !value.includes('*')) {
        webpackPlugins.push(
          new CopyWebpackPlugin([
            {
              from: path.join(ext.pathToSrc, value),
              to: path.join(ext.pathToUnpacked, value),
            },
          ]),
        );
      }
    }
  });

  if (manifest.background && manifest.background.scripts) {
    manifest.background.scripts.forEach((script: string) => {
      if (script === 'browser-polyfill.js') {
        polyfill = true;
        return;
      }

      const parsed = path.parse(script);
      const name = script.replace(parsed.ext, '');
      webpackEntries[name] = path.resolve(ext.pathToSrc, script);
      reloaderEntries.background = name;
    });
  }

  if (manifest.content_scripts) {
    const scripts = manifest.content_scripts.reduce((acc: string[], { js }: { js: string[] }) => [...acc, ...js], []);

    scripts.forEach((script: string) => {
      if (script === 'browser-polyfill.js') {
        polyfill = true;
        return;
      }

      const parsed = path.parse(script);
      const name = script.replace(parsed.ext, '');
      webpackEntries[name] = path.resolve(ext.pathToSrc, script);
      reloaderEntries.contentScript.push(name);
    });
  }

  if (manifest.web_accessible_resources) {
    manifest.web_accessible_resources.forEach((resource: string) => {
      glob.sync(resource, { cwd: ext.pathToSrc }).forEach((file) => {
        webpackPlugins.push(
          new CopyWebpackPlugin([
            {
              from: path.join(ext.pathToSrc, file),
              to: path.join(ext.pathToUnpacked, file),
            },
          ]),
        );
      });
    });
  }

  if (polyfill) {
    webpackPlugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(pkg.pathToNodeModules, 'webextension-polyfill/dist/browser-polyfill.js'),
        },
      ]),
    );
  }

  // Search for any html files in extSrc and add included scripts to webpack entries.
  // Add CopyWebpackPlugin for each html that transforms .tsx, .jsx and .ts to .js.
  glob.sync('**/*.html', { cwd: ext.pathToSrc }).forEach((htmlFile) => {
    const htmlPath = path.join(ext.pathToSrc, htmlFile);
    const dirname = path.dirname(htmlPath);
    const content = fs.readFileSync(htmlPath);
    const dom = new JSDOM(content.toString());

    dom.window.document.querySelectorAll('script').forEach((script) => {
      const scriptPath = path.join(dirname, script.src);
      const scriptExists = fs.pathExistsSync(scriptPath);

      if (scriptExists) {
        const relative = path.relative(ext.pathToSrc, scriptPath);
        const parsed = path.parse(relative);
        const name = relative.replace(parsed.ext, '');
        webpackEntries[name] = scriptPath;
        reloaderEntries.extensionPage.push(name);
      }
    });

    webpackPlugins.push(
      new CopyWebpackPlugin([
        {
          from: path.join(ext.pathToSrc, htmlFile),
          to: path.join(ext.pathToUnpacked, htmlFile),
          transform(content) {
            return (
              content
                .toString()
                // Transform .tsx into .js
                .replace(/src=".+(\.tsx)"/g, (match) => {
                  return match.replace('.tsx"', '.js"');
                })
                // Transform .jsx into .js
                .replace(/src=".+(\.jsx)"/g, (match) => {
                  return match.replace('.jsx"', '.js"');
                })
                // Transform .ts into .js
                .replace(/src=".+(\.ts)"/g, (match) => {
                  return match.replace('.ts"', '.js"');
                })
            );
          },
        },
      ]),
    );
  });

  return {
    entry: webpackEntries,
    plugins: webpackPlugins,
    reloader: new ExtensionReloader({
      entries: reloaderEntries,
    }),
  };
}

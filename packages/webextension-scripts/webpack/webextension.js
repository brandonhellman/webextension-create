const flatten = require('flat');
const fs = require('fs-extra');
const glob = require('glob');
const { JSDOM } = require('jsdom');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const packageJson = require('../utils/packageJson');
const paths = require('../utils/paths');

const manifestJsExists = fs.pathExistsSync(paths.extManifestJs);
const manifestJsonExists = fs.pathExistsSync(paths.extManifestJson);

const reloaderEntries = { contentScript: [], background: undefined };
const webpackEntries = {};
const webpackPlugins = [];

let manifest;
let polyfill;

if (!manifest && manifestJsExists) {
  manifest = require(paths.extManifestJs);
}

if (!manifest && manifestJsonExists) {
  manifest = fs.readJSONSync(paths.extManifestJson);
}

if (!manifest) {
  throw new Error('No manifest found!');
} else {
  const replaced = JSON.stringify(manifest)
    .replace(/__package\.name__/g, packageJson.name)
    .replace(/__package\.version__/g, packageJson.version)
    .replace(/\.jsx"/g, '.js"')
    .replace(/\.tsx"/g, '.js"')
    .replace(/\.ts"/g, '.js"');

  webpackPlugins.push(new GenerateJsonPlugin('manifest.json', JSON.parse(replaced)));
}

// Look for any .png in the manifest and copy it over.
Object.values(flatten(manifest)).forEach((value) => {
  if (typeof value === 'string') {
    const { ext } = path.parse(value);

    if (ext === '.png') {
      webpackPlugins.push(
        new CopyWebpackPlugin([
          {
            from: path.join(paths.extSrc, value),
          },
        ]),
      );
    }
  }
});

if (manifest.background && manifest.background.scripts) {
  manifest.background.scripts.forEach((script) => {
    if (script === 'browser-polyfill.js') {
      polyfill = true;
      return;
    }

    const { ext } = path.parse(script);
    const name = script.replace(ext, '');
    webpackEntries[name] = path.resolve(paths.extSrc, script);
    reloaderEntries.background = name;
  });
}

if (manifest.content_scripts) {
  const scripts = manifest.content_scripts.reduce((acc, { js }) => [...acc, ...js], []);

  scripts.forEach((script) => {
    if (script === 'browser-polyfill.js') {
      polyfill = true;
      return;
    }

    const { ext } = path.parse(script);
    const name = script.replace(ext, '');
    webpackEntries[name] = path.resolve(paths.extSrc, script);
    reloaderEntries.contentScript.push(name);
  });
}

if (polyfill) {
  webpackPlugins.push(
    new CopyWebpackPlugin([
      {
        from: path.resolve(paths.scriptsNodeModules, 'webextension-polyfill/dist/browser-polyfill.js'),
      },
    ]),
  );
}

// Search for any html files in extSrc and add included scripts to webpack entries.
// Add CopyWebpackPlugin for each html that transforms .tsx, .jsx and .ts to .js.
glob.sync('**/*.html', { cwd: paths.extSrc }).forEach((htmlFile) => {
  const htmlPath = path.join(paths.extSrc, htmlFile);
  const dirname = path.dirname(htmlPath);
  const content = fs.readFileSync(htmlPath);
  const dom = new JSDOM(content.toString());

  dom.window.document.querySelectorAll('script').forEach((script) => {
    const scriptPath = path.join(dirname, script.src);
    const scriptExists = fs.pathExistsSync(scriptPath);

    if (scriptExists) {
      const relative = path.relative(paths.extSrc, scriptPath);
      const { ext } = path.parse(relative);
      const name = relative.replace(ext, '');
      webpackEntries[name] = scriptPath;
    }
  });

  webpackPlugins.push(
    new CopyWebpackPlugin([
      {
        from: path.join(paths.extSrc, htmlFile),
        to: path.join(paths.extUnpacked, htmlFile),
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

module.exports = {
  entry: webpackEntries,
  plugins: webpackPlugins,
  reloader: new ExtensionReloader({
    entries: reloaderEntries,
  }),
};

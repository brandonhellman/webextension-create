# create-web-extension

Create web extensions with no build configuration. Inspired by [create-react-app](https://github.com/facebook/create-react-app).

# Quick Start

```
npx create-web-extension my-web-extension
cd my-web-extension
npm start
```

Then load the extension into your browser to begin development. Once you are ready to upload your extension for others to use you can create a minified bundle with `npm run build`.

## Creating an Extension

To create an extension you can use the following method:

### npx

Usage:

```
npx create-web-extension <project-directory> [options]
```

Options:

- `-r` or `--react` Use React in your extension.
- `-t` or `--typescript` Use Typescript in your extension.

The initial structure for the project is generated from the options passed to the the CLI and all dependencies installed.

```
project-directory
├── node_modules
├── public
│   ├── icon.png
├── src
│   ├── components (-r)
│   │   └── App.jsx (-r -t = App.tsx)
│   ├── content_scripts
│   │   └── script.js (-t = script.ts)
│   ├── pages
│   │   ├── background.js (-t = background.ts)
│   │   ├── popup.html
│   │   └── popup.js (-r = popup.jsx) (-t = popup.ts) (-r -t = popup.tsx)
│   └── manifest.json
├── package.json
└── tsconfig.json (-t)
```

<sub>**(items in parenthesis show file differences based on the options passed)**</sub>

No additional configuration is needed.

⚠️⚠️⚠️ Temporary ⚠️⚠️⚠️

All [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) need to be located in `./src/content_scripts`.

All [extension pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages) need to be located in `./src/pages`.

⚠️⚠️⚠️ Temporary ⚠️⚠️⚠️

## Available Scripts

In the project directory, you can run:

### `npm run start`

Compiles the extension into `./build/unpacked` to be loaded into your broswer for development. The extension automatically reloads when you save changes to the code.

##### Load into Chrome

1. Open Chrome
2. Go to `chrome://extensions`
3. Turn on `Developer mode`
4. Click `Load unpacked`
5. Select folder `./build/unpacked`

##### Load into Firefox

1. Open Firefox
2. Go to `about:debugging`
3. Click `Load Temporary Add-on...`
4. Open `./build/unpacked/manifest.json`

### `npm run build`

Compiles the extension into `./build/unpacked` and then packages that into production ready zips at `./build/{target}-{version}.zip`.

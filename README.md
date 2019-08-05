# create-browser-ext

Create browser extensions with no build configuration. Inspired by [create-react-app](https://github.com/facebook/create-react-app).

# Quick Start

```
npx create-browser-ext my-ext
cd my-ext
npm start
```

Then load the extension into your browser to begin development. Once you are ready to upload your extension for others to use you can create a minified bundle with `npm run build`.

## Creating an Extension

To create an extension you can use the following method:

### npx

Usage:

```
npx create-browser-ext <project-directory> [options]
```

Options:

- `-r` or `--react` Use React in your extension.
- `-t` or `--typescript` Use Typescript in your extension.

This will create a directory called `my-ext` inside the current folder. The initial structure for the project is generated from the options passed to the the CLI and all dependencies installed.

```
my-ext
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

All [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) need to be located in `/src/content_scripts/`.

All [extension pages](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages) need to be located in `/src/pages/`.

⚠️⚠️⚠️ Temporary ⚠️⚠️⚠️

Once the installation is done, you can open your project folder:

```
cd my-ext
```

and run some commands:

### `npm run start`

Compiles the extension into `/build/unpacked/`. Load this folder into your broswer for development. The extension automatically reloads when you save changes to the code.

[Chrome installation](https://developer.chrome.com/extensions/getstarted)

[Firefox installation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)

### `npm run build`

Compiles the extension and packages them into production ready zips at `/build/{target}-{version}.zip`. These zips can then be uploaded to their respective extension stores.

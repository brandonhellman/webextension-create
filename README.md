# WebExtension Create

Create web extensions with no build configuration. Inspired by [create-react-app](https://github.com/facebook/create-react-app).

## Quick Start

```sh
npx webextension-create
cd my-webextension
npm start
```

Then open your browser and load the unpacked folder. Any changes you make will automatically reload your extension.

When you are ready to publish your extension run `npm run build` to create all of the folders you'll need to upload.

You don't need to install or configure tools like Webpack or Babel. Everything is preconfigured and hidden so you can focus on the code.

## Creating a Web Extension

To create a new web extension you can use:

### npx

```sh
npx webextension-create
```

This will initiate the CLI asking for a project name and choice of template that will generate one of the following project structures:

#### template: `javascript`

```
my-webextension
├── node_modules
├── src
│   ├── background.js
│   ├── content_script.js
│   ├── icon.png
│   ├── manifest.json
│   ├── popup.html
│   └── popup.js
├── .gitignore
├── package.json
└── README.md
```

#### template: `react`

```
my-webextension
├── node_modules
├── src
│   ├── App.jsx
│   ├── background.js
│   ├── content_script.js
│   ├── icon.png
│   ├── manifest.json
│   ├── popup.html
│   └── popup.jsx
├── .gitignore
├── package.json
└── README.md
```

#### template: `react-typescript`

```
my-webextension
├── node_modules
├── src
│   ├── App.tsx
│   ├── background.ts
│   ├── content_script.ts
│   ├── icon.png
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.tsx
│   └── webextension-env.d.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

#### template: `typescript`

```
my-webextension
├── node_modules
├── src
│   ├── background.ts
│   ├── content_script.ts
│   ├── icon.png
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.ts
│   └── webextension-env.d.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

Once the setup if finished you can run

```sh
cd my-webextension
```

Now that you are inside the newly created project you can run some built in commands:

### `npm run start`

Compiles the extension into `./build/unpacked` to be that can be loaded into [Chrome](#load-into-chrome) or [Firefox](#load-into-firefox) for development.

The extension will automatically reload when you save changes.

#### Load into Chrome

1. Open Chrome
2. Go to `chrome://extensions`
3. Turn on `Developer mode`
4. Click `Load unpacked`
5. Select folder `./build/unpacked`

#### Load into Firefox

1. Open Firefox
2. Go to `about:debugging`
3. Click `Load Temporary Add-on...`
4. Open `./build/unpacked/manifest.json`

### `npm run build`

Compiles the extension into `./build/unpacked` and then packages that into production ready zips at `./build/{target}-{version}.zip`.

# webextension-create

This package includes the global command for [WebExtension Create](https://github.com/kadauchi/webextension-create).

## Creating an Extension

To create an extension you can use the following method:

### npx

Usage:

```
npx webextension-create <project-directory> [options]
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

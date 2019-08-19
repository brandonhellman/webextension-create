This project was bootstrapped with [WebExtension Create](https://github.com/kadauchi/webextension-create).

## Available Scripts

In the project directory, you can run:

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

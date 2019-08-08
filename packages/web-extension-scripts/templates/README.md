This project was bootstrapped with [Create Web Extension](https://github.com/kadauchi/create-web-extension).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Compiles the extension into `project-directory/build/unpacked` to be loaded into your broswer for development. The extension automatically reloads when you save changes to the code.

##### Load into Chrome

1. Open Chrome
2. Go to `chrome://extensions`
3. Turn on `Developer mode`
4. Click `Load unpacked`
5. Select folder `project-directory/build/unpacked`

##### Load into Firefox

1. Open Firefox
2. Go to `about:debugging`
3. Click `Load Temporary Add-on...`
4. Open `project-directory/build/unpacked/manifest.json`

### `npm run build`

Compiles the extension and packages them into production ready zips at `project-directory/build/{target}-{version}.zip`. These zips can then be uploaded to their respective extension stores.

---

Documentation: https://github.com/kadauchi/create-web-extension#create-web-extension

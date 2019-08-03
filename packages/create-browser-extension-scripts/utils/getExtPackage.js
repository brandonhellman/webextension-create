const fs = require('fs-extra');
const path = require('path');

const extPath = require('./getExtPath');
const extPackage = fs.readJsonSync(path.join(extPath, 'package.json'));

module.exports = extPackage;

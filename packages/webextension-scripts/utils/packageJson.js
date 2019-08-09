const fs = require('fs-extra');

const paths = require('./paths');
const packageJson = fs.readJsonSync(paths.extPackageJson);

module.exports = packageJson;

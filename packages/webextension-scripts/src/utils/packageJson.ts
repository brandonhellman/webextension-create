import fs from 'fs-extra';

import paths from './paths';

const packageJson = fs.readJsonSync(paths.extPackageJson);

export default packageJson;

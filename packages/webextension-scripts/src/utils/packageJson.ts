import fs from 'fs-extra';

import * as paths from './paths';

const packageJson = fs.readJsonSync(paths.extPackageJson);

export default packageJson;

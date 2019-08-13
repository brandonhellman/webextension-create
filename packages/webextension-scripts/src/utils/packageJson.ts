import fs from 'fs-extra';

import * as paths from './paths';

export const packageJson = fs.readJsonSync(paths.extPackageJson);

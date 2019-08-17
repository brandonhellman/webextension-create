import fs from 'fs-extra';

import * as paths from './paths';

export const extPackageJson = fs.readJsonSync(paths.extPackageJson);

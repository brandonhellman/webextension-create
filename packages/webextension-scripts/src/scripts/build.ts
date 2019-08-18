import webpack from 'webpack';

import { archiveUnpacked } from '../utils/archiveUnpacked';
import { config } from '../webpack/config';
// import { tsconfigSetup } from '../utils/tsconfigSetup';


export function build() {
  const { production } = config();

  // @ts-ignore
  webpack(production).run((err: Error, stats: webpack.Stats) => {
    if (err) {
      console.error(err);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.log('Failed to compile.');
      console.error(info.errors);
      return;
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(`Compiled in ${stats.endTime && stats.startTime ? stats.endTime - stats.startTime : '?'}ms!`);
    console.log();

    archiveUnpacked();
  });
}

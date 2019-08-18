import webpack from 'webpack';

import { archiveUnpacked } from '../utils/archiveUnpacked';
import { tsconfigSetup } from '../utils/tsconfigSetup';
import { production } from '../webpack/config';

export default function build() {
  tsconfigSetup();

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
    console.log()
    
    archiveUnpacked();
  });
}

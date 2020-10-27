import { config } from '../webpack/config';
import webpack from 'webpack';

export async function start() {
  const { development } = config();

  // @ts-ignore
  webpack(development).watch(
    { aggregateTimeout: 300, poll: 1000 },
    (err: Error, stats: webpack.Stats) => {
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

      console.log(
        `Compiled in ${
          stats.endTime && stats.startTime
            ? stats.endTime - stats.startTime
            : '?'
        }ms!`
      );
    }
  );
}

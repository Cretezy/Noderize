import { getOptions } from "../options";
import { getCompiler, printStats } from "../webpack";
import { copyAll } from "../copy";
import { buildLogger as log } from "../utils/logger";

export default async args => {
  log.start("Building...");
  console.log();

  const options = getOptions(args);

  const compiler = await getCompiler(options);

  try {
    const stats = await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });

    printStats(stats, options);
    console.log();

    // Copy
    if (Object.keys(options.static).length > 0) {
      await copyAll(options.static, options);
      console.log();
    }

    log.success("Done building!");
  } catch (error) {
    log.error("Error building.");
    log.error(error);
  }
};

import { resolveApp } from "./utils/path";
import fs from "fs-extra";
import { copyLogger as log } from "./utils/logger";

export async function copyAll(files, options) {
  await Promise.all(
    Object.keys(files).map(async source => {
      const destination = files[source];

      await copyFile(source, destination, options);
    })
  );
}

export async function copyFile(source, destination, options) {
  try {
    await fs.copy(
      resolveApp(options.srcDirectory, source),
      resolveApp(options.distDirectory, destination)
    );

    log.info(
      `Copied ${options.srcDirectory}/${source} to ${
        options.distDirectory
      }/${destination}!`
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      log.error(`Could not find ${options.srcDirectory}/${source}.`);
    } else {
      log.error(
        `Error copying ${options.srcDirectory}/${source} to ${
          options.distDirectory
        }/${destination}.`
      );
      log.error(error);
    }
  }
}

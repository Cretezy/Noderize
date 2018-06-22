import { getOptions } from "../options";
import { resolveApp } from "../utils/path";
import fs from "fs-extra";
import { cleanLogger as log } from "../utils/logger";

export default async args => {
  log.start("Cleaning...");

  const options = getOptions(null);

  try {
    await fs.remove(resolveApp(options.distDirectory));

    log.success("Done cleaning!");
  } catch (error) {
    log.error("Error deleting files.");
    log.error(error);
  }
};

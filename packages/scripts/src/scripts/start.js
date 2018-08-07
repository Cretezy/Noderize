import spawn from "cross-spawn";
import { getOptions } from "../options";
import { appDirectory } from "../utils/path";
import fs from "fs-extra";
import { startLogger as log } from "../utils/logger";

export default async args => {
  await start(getOptions(args));
};

export async function start(options, nodePath = process.argv[0]) {
  log.start("Starting...");
  console.log(); // Padding

  const startFileExists = await fs.exists(options.startFile);
  if (!startFileExists) {
    log.error("Start file does not exists.");
    return;
  }

  const args = [options.startFile, ...options.args._];
  const execArgv = ["-r", "source-map-support/register"];

  // Enable V8 debugger
  if (options.inspect) {
    args.unshift("inspect");
  }
  // Enable Chrome DevTools debugger
  if (options.inspectChrome) {
    execArgv.push(`--inspect=${options.inspectChrome}`);
  }

  const child = spawn(nodePath, [...execArgv, ...args], {
    cwd: appDirectory,
    stdio: "inherit"
  });

  child.on("exit", (code, signal) => {
    if (code !== null) {
      console.log(); // Padding
      if (code === 0) {
        log.success("Exited gracefully!");
      } else {
        log.warn(
          `Exited with code ${code} ${signal ? `and signal ${signal}` : ""}`
        );
      }
    }
  });

  return child;
}

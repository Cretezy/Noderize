import path from "path";
import { getOptions } from "../options";
import { appDirectory, getBinPath } from "../utils/path";
import spawn from "cross-spawn";
import { formatLogger as log } from "../utils/logger";

export default async (args, fullArgs) => {
  log.start("Formatting...");

  const options = getOptions(null);

  const srcPrefixed = ["**/*.ts", "**/*.js", "**/*.json"].map(file =>
    path.join(options.srcDirectory, file)
  );
  const files = [...srcPrefixed, "package.json"];

  const prettierPath = await getBinPath("prettier");

  const child = spawn(
    fullArgs[0],
    [prettierPath, "--write", ...files, ...args],
    {
      cwd: appDirectory,
      stdio: "inherit"
    }
  );

  child.on("exit", code => {
    const message = "Done formatting!";

    (code === 0 ? log.success : log.warn)(message);
    // Exit Noderize process with Jest exit code
    process.exit(code);
  });
};

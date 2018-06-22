import { appDirectory, getBinPath } from "../utils/path";
import spawn from "cross-spawn";
import { lintLogger as log } from "../utils/logger";

export default async (args, fullArgs) => {
  // TODO: add better linting support
  log.start("Linting...");

  const eslintPath = await getBinPath("eslint");

  const child = spawn(fullArgs[0], [eslintPath, ...args], {
    cwd: appDirectory,
    stdio: "inherit"
  });

  child.on("exit", code => {
    const message = "Done linting!";

    (code === 0 ? log.success : log.warn)(message);
  });
};

import { run } from "./run"
import parseArgs from "minimist";

// Parse args
const args = parseArgs(process.argv.slice(2));
const name = args._.length > 0 ? args._[0] : null;

run(name, args);
